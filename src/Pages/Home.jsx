import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab'
import { Autocomplete, Button, Tab, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { signOut } from '../store/user'
import {  USER } from '../utils'

function Home() {

    const type = useSelector(state=>state.user.type)
    const user = useSelector(state=>state.user["user"])
    const dispatch = useDispatch()
    const history = useHistory()
    console.log(user,type);
    const [name, setname] = React.useState("");
    const [quantity, setquantity] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [currentTab, setCurrentTab] = React.useState("ADD");


    if(!user && !type){
        console.log("/=========")
        return <Redirect to="/" />
    }
    else if(!user){
        console.log("/login============")
        return <Redirect to="/login" />
    }
    else if(type === USER){
        console.log("/user============")
        return (
            <Box sx={{ width: "33%", typography: "body1", marginLeft: "33%", display:"flex", flexDirection:"column", justifyContent:"space-evenly", height:"100vh" }}>
                <Autocomplete
                    disablePortal
                    options={[]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Medicines" />}
                />
                <Button variant="contained" sx={{ width: 300, height:"50px" }}  onClick={()=>{
                    dispatch(signOut());
                    history.replace("/")
                }} >
                    Sign Out
                </Button>
            </Box>
        )
    }
    else{
        console.log("/chemist============")
        return (
            <Box sx={{ width: "33%", typography: "body1", marginLeft: "33%" }}>
                <TabContext value={currentTab}>
                <Box>
                    <TabList
                        onChange={(e, v) => {
                            setCurrentTab(v);
                        }}
                        centered
                    >
                        <Tab label="ADD Medicine" value={"ADD"} sx={{ color: "#FF7878" }} />
                        <Tab label="UPDATE Medicine" value={"UPDATE"} sx={{ color: "#FF7878" }} />
                    </TabList>
                </Box>
                <TabPanel
                    value={"ADD"}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Name"
                        onChange={(e) => {
                            setname(e.target.value);
                        }}
                        style={{ margin: "20px" }}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Quantity"
                        onChange={(e) => {
                            setquantity(e.target.value);
                        }}
                        style={{ margin: "20px" }}
                    />
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        style={{ backgroundColor: "#FF7878", margin: "20px" }}
                    >
                        Add
                    </LoadingButton>
                </TabPanel>
                <TabPanel
                    value={"UPDATE"}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Name"
                        onChange={(e) => {
                            setname(e.target.value);
                        }}
                        style={{ margin: "20px" }}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Quantity"
                        onChange={(e) => {
                            setquantity(e.target.value);
                        }}
                        style={{ margin: "20px" }}
                    />
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        style={{ backgroundColor: "#FF7878", margin: "20px" }}
                        load
                    >
                        Update
                    </LoadingButton>
                </TabPanel>
            </TabContext>
            </Box>
        )
    }
}

export default Home
