import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login'
import SignUp from './components/SignUp'
import LoginResturant from './components/LoginResturant'
import SignUpResturant from './components/SignUpResturant'
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import DetailsPage from './components/DetailsPage';
import Profile from './components/Profile';
import ProfileResturant from './components/ProfileResturant';
import HomePageResturant from './components/HomePageResturant';
import SignOut from './components/SignOut';
import Menu from './components/Menu';
import BuyerOrders from './components/BuyerOrders';
import ResturantOrders from './components/ResturantOrders';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/LoginResturant" component={LoginResturant} />
          <Route exact path="/SignUpResturant" component={SignUpResturant} />
          <Route exact path="/HomePageResturant" component={HomePageResturant} />
          <Route exact path="/SignOut" component={SignOut} />
          <Route exact path="/Profile" component={Profile} />
          <Route exact path="/Menu" component={Menu} />
          <Route exact path="/ProfileResturant" component={ProfileResturant} />
          <Route exact path="/HomePage" component={HomePage} />
          <Route exact path="/SearchPage" component={SearchPage} />
          <Route exact path="/DetailsPage" component={DetailsPage} />
          <Route exact path="/BuyerOrders" component={BuyerOrders} />
          <Route exact path="/ResturantOrders" component={ResturantOrders} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
