import {
    Box,
    TextField,
    Typography,
    Container,
    Button,
    Stack,
    Switch
} from '@mui/material'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useState } from 'react';
import axios from 'axios';

import SearchResultTable from './searchResultTable';

function Search() {
    const [asppFilterSet, setAppFilterSet] = useState(true)
    const [userFilterSet, setUserFilterSet] = useState(false)
    const [searchString, setSearchString] = useState("")
    const [searchResults, setSearchResults] = useState({})

    const handleAppFilterChange = () => {
        setAppFilterSet(true)
        setUserFilterSet(false)
    }

    const handleUserFilterChange = () => {
        setAppFilterSet(false)
        setUserFilterSet(true)
    }

    const handleSearchStringChange = (evt) => {
        setSearchString(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        
        const url = `${process.env.REACT_APP_BACKEND}/api/user/search?search=${searchString}`

        axios.get(url).then(res => {
            setSearchResults(res)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const filterToggle = () => {
        return (
            <Box sx={{ marginBottom: 5 }}>
                <Button variant="contained" disableElevation 
                    style={{ 
                        padding: '0.5em 2em',
                        borderRadius: 0,
                        backgroundColor: asppFilterSet ? '#1976d2' : '#D5D5D5',
                        color: asppFilterSet ? 'white' : 'black'
                    }}
                    onClick={handleAppFilterChange}
                >
                    Apps
                </Button>
                <Button variant="contained" disableElevation
                    style={{ 
                        padding: '0.5em 2em',
                        borderRadius: 0,
                        backgroundColor: userFilterSet ? '#1976d2' : '#D5D5D5',
                        color: userFilterSet ? 'white' : 'black'
                    }}
                    onClick={handleUserFilterChange}
                >
                    User
                </Button>
            </Box>
        )
    }

    return (
        <Container
            sx={{ marginTop: 30 }}
        >   
            {filterToggle()}
            <Box display={{ display: 'flex' }} component="form" onSubmit={handleSubmit}>
                <ManageSearchIcon 
                    style={{ fontSize: 60 }}
                />
                <TextField
                    id="outlined-required"
                    label="Search"
                    fullWidth
                    sx={{ width: '100%', marginLeft: 2 }}
                    onChange={handleSearchStringChange}
                />
                <Button variant="contained" type="submit"
                    sx={{ padding: '0 3em', height: 55, marginLeft: 2 }}
                >
                    Search
                </Button>
            </Box>
            <SearchResultTable />
        </Container>
    )
}

export default Search