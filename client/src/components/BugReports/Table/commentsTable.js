import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import React, { useEffect, useState } from "react";

export default function Comments({ comments }) {
    const CommentRow = ({ comment }) => {
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell sx={{ borderBottom: "none" }}>
                        <Box sx={{ display: 'flex' }}>
                            <Avatar>{comment.username[0]}</Avatar>
                            <Box sx={{ margin: 'auto 1em auto 2em' }}>
                                <Typography>By <strong>{comment.username}</strong></Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ marginLeft: 8.5 }}>{comment.body}</Typography>
                        <Box sx={{ marginLeft: 6.5 }}>
                            <Button>Edit</Button>
                            <Button sx={{ color: 'red' }}>Delete</Button>
                        </Box>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }

    if (comments.length == 0) {
        return (
            <Typography sx={{ width: '100%', textAlign: 'center' }}>
                No comments to display.
            </Typography>
        )
    }

    return (
        <Box sx={{ margin: '1em 0em 0em 3em' }}>
            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <TableBody>
                        {comments.map(comment => {
                            return (
                                <CommentRow comment={comment}
                                    key={comment.useId + " - " + comment.body}                                
                                />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}