import React, { useContext, useEffect, useState } from "react";
import constants from "../utils/constants";
import BasicTable from "../components/table";
import { Box, Button, TextField } from '@mui/material';
import coinGeckoApi from "../api/coin-gecko";
import UserContext from "../context/user";

export default function Favourties() {
    const {favourites} = useContext(UserContext)
    const [coinsData, setCoinsData] = useState([])

    const getData = async () => {
        const res = await coinGeckoApi.search({
            params: {
                search: '',
                filter: ''
            }
        })
        setCoinsData(res.data.filter((coin) => favourites.includes(coin.id)))
        // console.log(res.data)
    }

    useEffect(() => {
        getData();

        const intervalId = setInterval(getData, 5 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);
    
    const handleSearch = () => {
        getData()
    }

    return (
        <Box>
            <Box sx={{
                my: 10,
                boxSizing: 'border-box',
                px: {xs: 0, md: 10}
            }}>
                <Box 
                    sx={{
                        my: 1, 
                        background: '#1e1d1d', 
                        p: 2, 
                        color: 'white', 
                        display: 'flex', 
                        // width: '100%', 
                        justifyContent: 'space-between',
                        gap: 2
                    }}
                >

                    <Button
                        variant="contained"
                        color="info"
                        onClick={handleSearch}
                    >
                        Load
                    </Button>
                </Box>
                <BasicTable data={coinsData}/>
            </Box>
        </Box>
    )
}
