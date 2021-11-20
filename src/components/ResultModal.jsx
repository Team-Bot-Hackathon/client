import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setBanner, setModalOpen } from '../store/user';
import { AppBar,  Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import Mapcomponent from './Mapcomponent';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResultModal() {
    console.log(window);
    const open = useSelector(state => state.user.modalOpen);
    const data = useSelector(state => state.user.modalData)
    const dispatch = useDispatch();
    dispatch(setBanner(false))
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={() => { dispatch(setModalOpen(false)) }}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative',backgroundColor:"#51eaea",color:"black" }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Result
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => { dispatch(setModalOpen(false)) }}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{flexGrow:1,display:"flex",flexDirection:"row"}} >
                <Box sx={{width:"50%"}} >
                    <TableContainer component={Paper}>
                        {data && <Table sx={{ backgroundColor: 'white' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Pharmacy Name</TableCell>
                                    <TableCell align="left">Address</TableCell>
                                    <TableCell align="left">Contact</TableCell>
                                    <TableCell align="left">Distance</TableCell>
                                    <TableCell align="left">Medicine Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data["shop"] && data["shop"].map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.address}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.contact_no}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {`${row.distance.toFixed(2)} KM`}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.quantity}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>}
                    </TableContainer>
                    <Typography variant="h5" sx={{margin:"10px"}} >
                        Follow this path to cover maximum pharmacies with minimum travel:  
                    </Typography>
                    <Timeline position="alternate">
                        {data["path"] && data["path"].map((index,i)=>{
                            let lastIndex = data["path"].length;
                            console.log(lastIndex)
                            return(
                                <TimelineItem>
                                    <TimelineSeparator>
                                    <TimelineDot sx={{backgroundColor:"#51eaea"}} />
                                    {lastIndex-1 === i ? null : <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent>{data["shop"].find((obj)=>obj.pharmacy_id===index)?.name}</TimelineContent>
                                </TimelineItem>
                            )
                        })}
                </Timeline>
                </Box>
                <Box sx={{width:"50%"}} >
                    <Mapcomponent/>
                </Box>
            </Box>
        </Dialog>
    );
}

