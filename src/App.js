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
      <Grid container columns={12} sx={{ marginBottom: "50px" }} >
        <Grid item sx={{ marginLeft: "50px", marginTop: '50px' }} xs={12}>
          <Grid container sx={{ display: 'flex', justifyContent: "center" }} columns={12} >
            <Grid xs={4} >
              <Typography align="center" variant="h5" >Users</Typography>
              <Typography variant="body1" >
                The WebApp has a graph of all the registered pharmacy shops. After signing up, a user can select the required medicine. Initially, the application will check the inventory of the pharmacy nearest to the user. If the nearest pharmacy contains the medicine, then it will return the information to the user. If not, then the application will search for all the pharmacies which have the required medicine. Then, using algorithms, the WebApp will select the shop which has the required medicine and is closest to the user. Once this process is done, the application will share the information with the user. The information will appear on a map and will guide the user to the nearest pharmacy. The result will also include an efficient path for the user to navigate through multiple pharmacies which have the required medicine. Hence, the user can reach the pharmacy to procure the required medicine.            </Typography>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: "center", alignContent: "center" }} xs={4} >
              <img alt="img1" width="400px" style={{ borderRadius: "10px" }} src={Image1} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ marginRight: "50px", marginTop: '50px' }} xs={12}>
          <Grid container sx={{ display: 'flex', justifyContent: "center" }} columns={12} >
            <Grid sx={{ display: 'flex', justifyContent: "center", alignContent: "center" }} xs={4} >
              <img alt="img2" width="400px" style={{ borderRadius: "10px" }} src={Image2} />
            </Grid>
            <Grid xs={4} >
              <Typography align="center" variant="h5" >Pharmacies</Typography>
              <Typography variant="body1" >
                The pharmacies have the option of registering themselves on the WebApp. After registering successfully, the pharmacies can add as well as delete a medicine, depending on the availability of the medicine. The pharmacies can further update the stock of their medicines as and when required. When a customer is in need of a medicine, he will be suggested to go to the pharmacy closest to him which has the medicine. This promotes the pharmacy owners to constantly keep available the important medicines so that they do not miss out on the local business opportunities. This will increase the business of the pharmacies as more of the local crowd which was not aware of the shop will now start doing transactions with it. Many more people who encounter emergencies in the area will tend to go to the nearest pharmacy to them.              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {open && <ResultModal />}
    </>
  );
}

export default App;
