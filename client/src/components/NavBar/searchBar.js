import {
    Box,
    InputBase
} from '@mui/material'

import {
    Search as SearchIcon
} from '@material-ui/icons'

import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import axios from 'axios';

function SearchBar() {
    const [searchString, setSearchString] = useState("")
    const [searchResults, setSearchResults] = useState({})
    const [userIsSearching, setUserIsSearching] = useState(false)

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        // marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            // marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
        },
    }));

    const handleSearch = (evt) => {
        evt.preventDefault();

        setSearchString(evt.target.value)
        
        const url = `${process.env.REACT_APP_BACKEND}/api/user/search?search=${evt.target.value}`

        axios.get(url).then(res => {
            setSearchResults(res)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const onFocus = () => {
        setUserIsSearching(true)
    }

    useEffect(() => { 
        console.log("detecting")
        console.log(document.activeElement) 
    }, [])

    return (
        <Box sx={{ flexGrow: 0.6 }}>
            <Search sx={{ width: '100%' }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearch}
                    value={searchString}
                    onFocus={onFocus}
                    autoFocus={userIsSearching}
                />
            </Search>
            {/* the table that shows up needs to have an absolute position */}
            <Box sx={{
                position: 'absolute',
            }}/>
        </Box>
    )
}

export default SearchBar