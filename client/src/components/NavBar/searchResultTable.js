import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CodeIcon from '@mui/icons-material/Code';

import { useState, useEffect } from 'react';


function SearchResultTable({ results }) {
    const UserRow = ({ result }) => {
        return (
            <TableRow>
                <TableCell sx={{ borderBottom: "none", padding: 1, display: 'flex' }}>
                    <Avatar sx={{ margin: 'auto 0' }}>{result.username[0]}</Avatar>
                    <Link href={`/profile/${result._id}`} underline="none">
                        <Typography 
                            sx={{ fontSize: 30,  color: '#1976d2', marginLeft: 2 }}
                        >
                            {result.username}
                        </Typography>
                    </Link>
                </TableCell>
            </TableRow>
        )
    }

    const AppRow = ({ result }) => {
        return (
            <TableRow>
                <TableCell sx={{ borderBottom: "none", padding: 1, display: 'flex' }}>
                    <Avatar sx={{ margin: 'auto 0' }}><CodeIcon /></Avatar>
                    <Link href={`/profile/${result.userId}?app=${result._id}`} underline="none">
                        <Typography 
                            sx={{ fontSize: 30,  color: '#1976d2', marginLeft: 2 }}
                        >
                            {result.imageName}
                        </Typography>
                    </Link>
                </TableCell>
            </TableRow>
        )
    }

    const Row = ({ result }) => {
        if (result.imageName === undefined) {
            return <UserRow result={result}/>
        }
        else {
            return <AppRow result={result}/>
        }
    }

    return (
        <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
            <TableBody>
                { results.map(result => {
                    return <Row result={result}/>
                })}
            </TableBody>
        </TableContainer>
    )
}

export default SearchResultTable