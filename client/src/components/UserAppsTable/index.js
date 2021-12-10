import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Container from '@mui/material/Container';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';


function AppsTable({ apps }) {
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
        border: 0,
        },
    }));

    const tableHeaderStyles = {
        fontSize: '1.3em',
        color: 'white',
        fontWeight: 'bold'
    }

    const tableRowStyles = {
        fontSize: '1.2em'
    }

    function Row(props) {
        const app = props.row;
        const [open, setOpen] = React.useState(false);
      
        return (
            <React.Fragment>
                <StyledTableRow
                    key={app.name}
                >
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell><Typography>{app.imageName}</Typography></TableCell>
                    <TableCell><Typography>{app.port}</Typography></TableCell>
                    <TableCell><Typography>{app.status}</Typography></TableCell>
                    <TableCell><Typography>{app.created}</Typography></TableCell>
                </StyledTableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box 
                          sx={{
                              marginTop: 3,
                              marginBottom: 3,
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '40%'
                          }}>
                              { app.status == 'running'
                                  ? <Button variant="contained" color="error">Stop</Button>
                                  : <Button variant="contained" color="success">Start</Button>
                              }
                              <Button variant="contained" color="info">View Bugs</Button>
                              <Button variant="contained" color="warning">Submit Bug</Button>
                              <Button variant="contained" color="error">Delete</Button>
                          </Box>
                      </Collapse>
                </TableCell>
            </React.Fragment>
        )
    }

    return (
        <TableContainer>
            <Table>
                <TableHead sx={{ backgroundColor: '#1976d2  ' }}>
                    <TableRow>
                        <TableCell />
                        <TableCell sx={tableHeaderStyles}>Name</TableCell>
                        <TableCell sx={tableHeaderStyles}>Port</TableCell>
                        <TableCell sx={tableHeaderStyles}>Status</TableCell>
                        <TableCell sx={tableHeaderStyles}>Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {apps.map((row) => (  
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AppsTable