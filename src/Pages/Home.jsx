import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab'
import { Autocomplete, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setBanner, setDistance, setmodalData, setModalOpen } from '../store/user'
import { ADD_MEDICINE, CHEMIST, GET_DISTANCE, GET_MEDICINE_LIST, GET_MEDICINE_LIST_CHEMIST, GET_RESULT, UPDATE_MEDICINE, USER } from '../utils'

function getData(position,ss){
    return new Promise(function(resolve,reject){
        axios.post(GET_DISTANCE,{
            "lat1":position.coords.latitude,
            "lon1":position.coords.longitude,
            "lat2":ss.lat,
            "lon2":ss.lon
        }).then((response)=>{resolve(response.data.route.distance)})
    })
}

function Home() {

    const type = useSelector(state => state.user.type)
    const user = useSelector(state => state.user["user"])
    const dispatch = useDispatch()
    console.log(user, type);
    const [name, setname] = React.useState("");
    const [quantity, setquantity] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [currentTab, setCurrentTab] = React.useState("ADD");
    const [medList, setmedList] = React.useState([])
    dispatch(setBanner(false));
    useEffect(() => {
        if (user) {
            if (type === USER) {
                axios.get(GET_MEDICINE_LIST).then(res => {
                    console.log(res.data['data']);
                    setmedList(res.data['data']);
                })
            }
            else if (type === CHEMIST) {
                axios.get(GET_MEDICINE_LIST_CHEMIST, {
                    headers: {
                        "token": user
                    }
                }).then(res => {
                    console.log(res.data['data']);
                    setmedList(res.data['data']);
                })
            }
        }
    }, [type, user])

    if (!user && !type) {
        console.log("/=========")
        return <Redirect to="/" />
    }
    else if (!user) {
        console.log("/login============")
        return <Redirect to="/login" />
    }
    else if (type === USER) {
        console.log("/user============")
        return (
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", width: "80%" }}>
                <Box sx={{ position: "relative", marginBottom: "200px" }} >
                    <Typography variant="h5">
                        Search for Medicines
                    </Typography>
                    <Autocomplete
                        disablePortal
                        options={medList.map(({ id, name }) => {
                            return name;
                        })}
                        onChange={(e,value) => {
                            let id = medList.find((med)=>med.name===value)?.medicine_id;
                            if (id) {
                                console.log(id,value)
                                navigator.geolocation.getCurrentPosition((position)=>{
                                    axios.post(GET_RESULT,
                                        {
                                            "medicine_id":id,
                                            "lat": position.coords.latitude,
                                            "lon": position.coords.longitude
                                        },
                                        {
                                            headers:{
                                                "token":user
                                            }
                                        }
                                    ).then(async(res)=>{
                                        let distArray=[]
                                        dispatch(setmodalData(res.data))
                                        for(let i=0;i<res.data.shop.length;i++){
                                            distArray[i] = await getData(position,res.data.shop[i]);
                                        }
                                        for(let i=0;i<res.data.shop.length;i++){
                                            dispatch(setDistance({distance:distArray[i],index:i})) 
                                        }
                                        dispatch(setModalOpen(true))
                                    })
                                })
                            }
                        }}
                        renderInput={(params) => <TextField {...params}  label="" />}
                    />
                </Box>
            </Box>
        )
    }
    else {
        console.log("/chemist============")
        return (
            <TabContext value={currentTab}>
                <Box sx={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "flex-start", }}>
                    <Box sx={{ paddingLeft: "30px" }} >
                        <TabList
                            onChange={(e, v) => {
                                setCurrentTab(v);
                            }}
                        >
                            <Tab label="ADD" value={"ADD"} />
                            <Tab label="UPDATE" value={"UPDATE"} />
                        </TabList>
                    </Box>
                    <TabPanel
                        value={"ADD"}
                    >
                        <Box style={{ display: "flex", flexDirection: "column" }} >
                        <TextField
                            variant="outlined"
                            placeholder="Name"
                            onChange={(e) => {
                                setname(e.target.value);
                            }}
                            style={{ marginBlock: "20px" }}
                        />
                        <TextField
                            variant="outlined"
                            type="number"
                            placeholder="Quantity"
                            onChange={(e) => {
                                setquantity(e.target.value);
                            }}
                            style={{ marginBlock: "20px" }}
                        />
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            style={{ marginBlock: "20px" }}
                            onClick={() => {
                                setLoading(true)
                                axios.post(ADD_MEDICINE, {
                                    "name": name,
                                    "quantity": quantity
                                }, {
                                    headers: {
                                        "content-type": "application/json",
                                        "token": user
                                    }
                                }).then((response) => {
                                    if (response.data["action"]) {
                                        axios.get(GET_MEDICINE_LIST_CHEMIST, {
                                            headers: {
                                                "token": user
                                            }
                                        }).then(res => {
                                            console.log(res.data['data']);
                                            setmedList(res.data['data']);
                                            setLoading(false)
                                        })
                                    }
                                    else {
                                        alert(response.data["err"]);
                                        setLoading(false)
                                    }
                                })
                            }}
                        >
                            Add
                        </LoadingButton>
                        </Box>              
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
                            style={{ marginBlock: "20px" }}
                        />
                        <TextField
                            variant="outlined"
                            placeholder="Quantity"
                            type="number"
                            onChange={(e) => {
                                setquantity(e.target.value);
                            }}
                            style={{ marginBlock: "20px" }}
                        />
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            style={{ marginBlock: "20px" }}
                            onClick={() => {
                                setLoading(true)
                                axios.post(UPDATE_MEDICINE, {
                                    "name": name,
                                    "quantity": quantity
                                }, {
                                    headers: {
                                        "content-type": "application/json",
                                        "token": user
                                    }
                                }).then((response) => {
                                    if (response.data["action"]) {
                                        axios.get(GET_MEDICINE_LIST_CHEMIST, {
                                            headers: {
                                                "token": user
                                            }
                                        }).then(res => {
                                            console.log(res.data['data']);
                                            setmedList(res.data['data']);
                                        })
                                        setLoading(false)
                                    }
                                    else {
                                        alert(response.data["err"]);
                                        setLoading(false);
                                    }
                                })
                            }}
                        >
                            Update
                        </LoadingButton>
                    </TabPanel>
                </Box>
                <Box sx={{ marginTop:"90px",width: "50%" }} >
                    <TableContainer component={Paper}>
                        {medList && <Table sx={{ backgroundColor: 'white' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Medicine Name</TableCell>
                                    <TableCell align="left">Calories</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medList.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.quantity}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>}
                    </TableContainer>
                </Box>
            </TabContext>
        )
    }
}

export default Home

