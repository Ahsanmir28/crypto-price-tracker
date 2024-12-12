import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {PropTypes} from 'prop-types'
import { Box } from '@mui/material';
import UserContext from '../context/user';


export default function BasicTable({data}) {
    const {favourites, handleFavouritesChange} = React.useContext(UserContext)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontSize: '18px', fontWeight: 'bold'}}>#</TableCell>
                        <TableCell sx={{fontSize: '18px', fontWeight: 'bold'}}>Name</TableCell>
                        <TableCell sx={{fontSize: '18px', fontWeight: 'bold'}}>Symbol</TableCell>
                        <TableCell sx={{fontSize: '18px', fontWeight: 'bold'}}>Price</TableCell>
                        <TableCell sx={{fontSize: '18px', fontWeight: 'bold'}}>Price Change</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {data.map((row, index) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {/* {index} */}
                            <input type='checkbox' checked={favourites.includes(row.id)} onClick={() => {handleFavouritesChange(row.id)}} />
                        </TableCell>
                        <TableCell>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <img src={row.image} height={20} width={20} /> 
                                <span style={{marginTop: 2}}>
                                    {row.name}
                                </span>
                            </Box>
                        </TableCell>
                        <TableCell>{row.symbol}</TableCell>
                        <TableCell>{row.current_price}</TableCell>
                        <TableCell>{row.price_change_percentage_24h}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
  );
}

BasicTable.propTypes = {
    data: PropTypes.array.isRequired
}
