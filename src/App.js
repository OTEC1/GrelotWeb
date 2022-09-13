import React, { Component }  from 'react';
import { useEffect } from "react";
import { connect } from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {getUserAuth}  from './actions'
import './App.css';
import Ads from "./components/Ads";
import Deals from "./components/Deals";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from './components/Login';
import Tokens from "./components/Tokens";
import Selectaction from "./components/Selectaction";
import User from "./components/User";
import Itemselected from './components/Itemselected'
import Register from './components/Register'
import Customlogin from './components/Customlogin'
import Forgot from './components/Forgot'
import Usertype  from './components/Usertype'



function App(props){
  useEffect(() => {
    //props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          
          <Route exact path="/">
          <Header/>
          <Ads/>
          <Home/>
          </Route>

          <Route exact path="/login">
          <Login/>
          </Route>


          <Route exact path="/user">
          <Header/>
          <Ads/>
          <User/>
          </Route>

          <Route exact path="/loans">
          <Header/>
          <Ads/>
          <Deals/>
          </Route>


          <Route exact path="/token">
          <Header/>
          <Ads/>
          <Tokens/>
          </Route>

          <Route exact path="/selectaction">
          <Header/>
          <Ads/>
          <Selectaction/>
          </Route>


          <Route  path="/itemselected/:e/:u/:m" component={<Itemselected/>}>
             <Header/>
             <Ads/>
             <Itemselected/>
          </Route>

          <Route path="/register">
            <Register/>
          </Route>



          <Route path="/Forgot">
            <Forgot/>
          </Route>



          <Route path="/usertype">
            <Usertype/>
          </Route>



          <Route path="/userlogin">
            <Customlogin/>
          </Route>

      
        </Switch>
      </Router>
    </div>
  );
}



const mapStateToProps = (state) => {
  return {};
}



const mapDispatchToProps = (disptach) => ({
  
  getUserAuth : () =>{  disptach(getUserAuth());},  
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
