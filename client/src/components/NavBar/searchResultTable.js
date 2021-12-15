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
                    <Box sx={{ padding: '0.1em 35em 0.1em 1em', backgroundColor: 'white' }}>
                        <Link href={`/profile/${result._id}`} underline="none"
                            sx={{
                                color: 'black', 
                                fontSize: 30, 
                                color: 'blue',
                            }}
                        >
                            {result.username}
                        </Link>
                        <br />
                    </Box>
                )
            })}
        </Box>
    )
}

export default SearchResultTable