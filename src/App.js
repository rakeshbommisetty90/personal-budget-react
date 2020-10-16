import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import AboutPage from './AboutPage/AboutPage';
import Footer from './Footer/Footer';

function App() {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div class="mainContainer">
        <Switch>
          <Route path='/about'>
            <AboutPage/>
          </Route>
          <Route path='/login'>
            <LoginPage/>
          </Route>
          <Route path='/'>
            <HomePage/>
          </Route>
        </Switch>      
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
