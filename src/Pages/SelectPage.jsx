import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { setType } from '../store/user'
import { CHEMIST, USER } from '../utils'

function SelectPage() {

    const history = useHistory();
    const user = useSelector(state=>state.user.user)
    const type = useSelector(state=>state.user.type)
    const dispatch = useDispatch()
    console.log("Select",user)

    if(user && type){
        return <Redirect to="/home" />
    }

    return (
        <Box sx={{ width: "33%", typography: "body1", marginLeft: "33%", display:"flex", flexDirection:"column", justifyContent:"space-evenly", height:"100vh" }}>
            <Button sx={{height:"200px"}} variant="contained" onClick={()=>{
                dispatch(setType(USER));
                history.replace("/home")
            }} >
                User 
            </Button >
            <Button sx={{height:"200px"}} variant="contained" onClick={()=>{
                dispatch(setType(CHEMIST));
                history.replace("/home")
            }} >
                Chemist
            </Button>
        </Box>
    )
}

export default SelectPage
