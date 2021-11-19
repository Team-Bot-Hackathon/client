import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SelectPage from './Pages/SelectPage';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { Box } from '@mui/system';

function App() {

  return (
      <Box sx={{ width: "500px",height:"600px",display:"flex",flexDirection:"row",justifyContent:"center" }} >
        <BrowserRouter>
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
          </Switch>
        </BrowserRouter>
      </Box>
  );
}

export default App;
