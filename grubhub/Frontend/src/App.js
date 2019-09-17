import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login'
import SignUp from './components/SignUp'
import LoginResturant from './components/LoginResturant'
import SignUpResturant from './components/SignUpResturant'
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
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
