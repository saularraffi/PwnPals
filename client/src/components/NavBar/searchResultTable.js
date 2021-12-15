import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useState, useEffect } from 'react';

function SearchResultTable({ results }) {
    useEffect(() => {
        console.log(results)
    })
    
    return (
        <Box>
            {results.map(result => {
                return (
                    <Typography color='black'>{result.username}</Typography>
                )
            })}
        </Box>
    )
}

export default SearchResultTable