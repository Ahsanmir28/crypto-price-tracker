import React, { useEffect, useRef, useState } from "react";
import constants from "../utils/constants";
import BasicTable from "../components/table";
import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import coinGeckoApi from "../api/coin-gecko";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Home() {
    const [searchQuery , setSearchQuery] = useState('')
    const [priceFilter, setPriceFilter] = React.useState('');
    const paramsRef = useRef({
        query: '',
        filter: ''
    })

    const handleChange = (event) => {
        setPriceFilter(event.target.value);
    };
    const [coinsData, setCoinsData] = useState([])

    const getData = async () => {
        const res = await coinGeckoApi.search({
            params: {
                search: paramsRef.current.query,
                filter: paramsRef.current.filter
            }
        })
        setCoinsData(res.data)
    }

    useEffect(() => {
        getData();

        const intervalId = setInterval(getData, 5 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleSearch = () => {
        paramsRef.current = {
            query: searchQuery,
            filter: priceFilter
        }
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
                        // background: '#1e1d1d', 
                        p: 2, 
                        color: 'white', 
                        display: 'flex', 
                        // width: '100%', 
                        justifyContent: 'space-between',
                        gap: 2
                    }}
                >
                    <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap'}}>
                        <TextField
                            variant='filled'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            // required
                            placeholder='Search Crypto here...'
                            // id="outlined-required"
                            label="Crypto Name"
                            // defaultValue="Hello World"
                            slotProps={{
                                input: {
                                    endAdornment: <SearchIcon />
                                }
                            }}
                        />

                        <FormControl sx={{width: 120, color: 'white'}}>
                            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priceFilter}
                                label="Price Filter"
                                onChange={handleChange}
                                variant="filled"
                            >
                                <MenuItem value={'none'}>None</MenuItem>
                                <MenuItem value={'increase'}>Increase</MenuItem>
                                <MenuItem value={'decrease'}>Decrease</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Button
                        variant="contained"
                        color="info"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Box>
                <BasicTable data={coinsData}/>
            </Box>
        </Box>
    )
}
