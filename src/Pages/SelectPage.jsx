import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { setBanner, setType } from '../store/user'
import { CHEMIST, USER } from '../utils'
import { Person, LocalHospital } from '@mui/icons-material';

function SelectPage() {

    const history = useHistory();
    const user = useSelector(state => state.user.user)
    const type = useSelector(state => state.user.type)
    const dispatch = useDispatch()
    dispatch(setBanner(true))

    if (user && type) {
        return <Redirect to="/home" />
    }

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h1" sx={{ color: "#fff", fontWeight: 800, fontSize: "70px", }}>
                    Welcome to
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h1" sx={{ color: "#fff", fontWeight: 800, fontSize: "70px", }}>
                    GetMeds
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button sx={{ color: "#000", backgroundColor: "#51eaea", borderColor: "#51eaea", fontWeight: 500, width: "180px", height: "60px", margin: "20px", "&:hover": { borderColor: "#51eaea", color: "#51eaea" } }} variant="outlined" startIcon={<Person />} onClick={() => {
                    dispatch(setType(USER));
                    history.replace("/home")
                }} >
                    User
                </Button >
                <Button sx={{ color: "#000", backgroundColor: "#51eaea", borderColor: "#51eaea", fontWeight: 500, width: "180px", height: "60px", margin: "20px", "&:hover": { borderColor: "#51eaea", color: "#51eaea" } }} variant="outlined" startIcon={<LocalHospital />} onClick={() => {
                    dispatch(setType(CHEMIST));
                    history.replace("/home")
                }} >
                    Chemist
                </Button>
            </Box>
        </Box>
    )
}

export default SelectPage
