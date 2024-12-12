import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import userApi from "../api/user";

export default function Login() {
    const {userData,setUserData} = useContext(UserContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const res = await userApi.loginUser({email, password})
        // console.log(res)
        if(res && res.data) {
            setUserData(res.data)
            sessionStorage.setItem('user', JSON.stringify(res.data))
            navigate('/', {replace: 'true'})
        }
        else {
            setError('Invalid email or password')
        }
    }

    useEffect(() => {
        if(userData !== null) navigate('/', {replace: true})
    }, [userData])

    return (
        <Box sx={{
            boxSizing: 'border-box',
            display: 'flex',
            width: '100%',
            px: 2,
            height: '80vh',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box 
                sx={{
                    display: 'flex',
                    width: {xs: '100%', md: '30%'},
                    border: '1px solid black',
                    borderRadius: '8px',
                    flexDirection: 'column',
                    gap: 4,
                    p: 2
                }}
                component={'form'}
                onSubmit={handleSubmit}
            >
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3>Login</h3>
                    <Link to={'/register'} style={{
                        color: 'black',
                        fontSize: '14px'
                    }}>
                        Create account
                    </Link>
                </Box>
                <TextField variant="filled" label="email" placeholder="john@gmail.com"
                    value={email} type="email" onChange={e=>setEmail(e.target.value)}
                    required={true}
                ></TextField>
                <TextField variant="filled" label="password" placeholder="**********"
                    value={password} type="password" onChange={e=>setPassword(e.target.value)}
                    required={true}
                ></TextField>

                {error}
                <Button type="submit" variant="contained">Login</Button>
            </Box>
        </Box>
    )
}