import { Outlet } from "react-router-dom";
import UserContext from "../context/user";
import { useEffect, useState } from "react";
import PrimarySearchAppBar from '../components/appbar'
import userApi from "../api/user";

export default function UserProvider() {
    const [userData, setUserData] = useState(null)
    const [favourites, setFavoutires] = useState([])

    const handleFavouritesChange = (id) => {
        const arr = [...favourites]
        const index = arr.indexOf(id)
        if(index < 0) {
            arr.push(id)
        } else {
            arr.splice(index, 1)
        }
        setFavoutires(arr)
        if(userData !== null) {
            userApi.setFavoutires({email: userData.email, favourites: arr})
            .then((res) => {
                setUserData(res.data)
                sessionStorage.setItem('user', JSON.stringify(res.data))
            })
        }
    }

    useEffect(() => {
        try {
            const obj = JSON.parse(sessionStorage.getItem('user'))
            setUserData(obj)
            setFavoutires(obj.favourites ?? [])
        } catch (err) {
            setUserData(null)
            setFavoutires([])
        }
    }, [])

    useEffect(() => {
        if(userData && userData.favourites)  {
            setFavoutires(userData.favourites ?? [])
        }
    }, [userData])

    const value = {
        userData,
        setUserData,
        favourites,
        handleFavouritesChange
    }

    return (
        <UserContext.Provider value={value}>
            <PrimarySearchAppBar />
            <Outlet />
        </UserContext.Provider>
    )
}