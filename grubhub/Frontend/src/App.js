import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login'
import SignUp from './components/SignUp'
import LoginResturant from './components/LoginResturant'
import SignUpResturant from './components/SignUpResturant'
import HomePage from './components/HomePage';
import './App.css';
import SearchPage from './components/SearchPage';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/LoginResturant" component={LoginResturant} />
          <Route exact path="/SignUpResturant" component={SignUpResturant} />

          <Route exact path="/HomePage" component={HomePage} />
          <Route exact path="/SearchPage" component={SearchPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
