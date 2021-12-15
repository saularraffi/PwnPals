import Link from '@mui/material/Link';
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
                    <Link href={`/profile/${result._id}`} sx={{color: 'black'}}>{result.username}</Link>
                )
            })}
        </Box>
    )
}

export default SearchResultTable