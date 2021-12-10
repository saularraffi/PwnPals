import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({ apps }) {
    const [open, setOpen] = React.useState(false);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>App Name</StyledTableCell>
            <StyledTableCell align="right">Port</StyledTableCell>
            <StyledTableCell align="right">Status&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Date Create&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Actions&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <React.Fragment>
                <StyledTableRow>
                    {apps.map((app) => (
                        <StyledTableRow key={app._id}>
                            <StyledTableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {app.imageName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{app.port}</StyledTableCell>
                            <StyledTableCell align="right">{app.status}</StyledTableCell>
                            <StyledTableCell align="right">{app.created}</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCell>
                        <Collapse in={open} timeout="auto" unmountOnExit>Hello</Collapse>
                    </StyledTableCell>
                </StyledTableRow>
            </React.Fragment>
        </TableBody>
      </Table>
    </TableContainer>
  );
}