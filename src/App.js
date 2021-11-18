import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SelectPage from './Pages/SelectPage';
import { useDispatch } from 'react-redux';
import { setUser } from './store/user';
import Login from './Pages/Login';
import Home from './Pages/Home';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <SelectPage />
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
