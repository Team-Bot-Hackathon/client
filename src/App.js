import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import SelectPage from './Pages/SelectPage';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { Box } from '@mui/system';
import { AppBar, Button, Grid, Toolbar, Typography, } from '@mui/material';
import About from './Pages/About';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from './store/user';
import ResultModal from './components/ResultModal';
import Image1 from './assets/image_1.jpg'
import Image2 from './assets/image_2.jpg'


function App() {
  const isBanner = useSelector(state => state.user.isBanner)
  const history = useHistory();
  const user = useSelector(state => state.user.user)
  const open = useSelector(state => state.user.modalOpen)
  const dispatch = useDispatch();

  return (
    <>
      <Box sx={{
        height: "100vh",
        backgroundColor: "#ffffff",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // eslint-disable-next-line no-useless-concat
        backgroundImage: isBanner ? "url(" + "https://preview.colorlib.com/theme/pharma/images/xhero_1.jpg.pagespeed.ic.ZZMiAwgmOC.webp" + ")" : "",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }} >
        <AppBar position="absolute" elevation={0} sx={{ flexGrow: 1, backgroundColor: "#fff", top: 0, height: "70px", color: "#000" }}>
          <Toolbar variant="regular" >
            <Box sx={{ display: "flex", flexGrow: 1, alignItems: 'center' }} >
              <Button onClick={() => { history.push("/") }} sx={{ color: "#000", width: "33%", fontWeight: 900, fontSize: "22px", letterSpacing: ".2em", "&:hover": { backgroundColor: "#FFF" } }}>
                GetMeds
              </Button>
              <Box sx={{ display: "flex", width: "33%", justifyContent: "center", }} >
                <Button onClick={() => { history.push("/home") }} sx={{
                  fontSize: "15px",
                  backgroundColor: "transparent", "&:hover": {
                    backgroundColor: "#FFF"
                  }
                }} color="inherit">Home</Button>
                <Button onClick={() => { history.push("/") }} sx={{
                  fontSize: "15px",
                  backgroundColor: "transparent", "&:hover": {
                    backgroundColor: "#FFF"
                  }
                }} color="inherit">Select Role</Button>
              </Box>
              <Button onClick={() => {
                if (user) {
                  dispatch(signOut());
                  history.replace("/");
                }
                else {
                  history.replace("/login");
                }
              }} sx={{
                width: "33%",
                fontSize: "15px",
                backgroundColor: "transparent", "&:hover": {
                  background: "#FFF"
                }
              }} color="inherit">{user ? "SignOut" : "Login"}</Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "90vw", height: "600px", display: "flex", flexDirection: "row", justifyContent: "center" }} >
          <Switch>
            <Route exact path="/">
              <SelectPage />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </Box>
      </Box>
      <Grid container columns={12} sx={{marginBottom:"50px"}} >
        <Grid item sx={{  marginLeft: "50px", marginTop: '50px' }} xs={12}>
          <Grid container sx={{ display: 'flex', justifyContent: "center" }} columns={12} >
            <Grid xs={4} >
              <Typography align="center" variant="h5" >Heading</Typography>
              <Typography variant="body1" >
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
              </Typography>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: "center", alignContent: "center" }} xs={4} >
              <img alt="img1" width="400px" style={{borderRadius:"10px"}} src={Image1} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{  marginRight: "50px", marginTop: '50px' }} xs={12}>
          <Grid container sx={{ display: 'flex', justifyContent: "center" }} columns={12} >
            <Grid sx={{ display: 'flex', justifyContent: "center", alignContent: "center" }} xs={4} >
              <img alt="img2" width="400px" style={{borderRadius:"10px"}} src={Image2} />
            </Grid>
            <Grid xs={4} >
            <Typography align="center" variant="h5" >Heading</Typography>
              <Typography variant="body1" >
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
              </Typography>            
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      {open && <ResultModal />}
    </>
  );
}

export default App;
