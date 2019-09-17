import { Link } from 'react-router-dom';
import React from 'react';
const axios = require('axios');


class Login extends React.Component {
    handleLogin = (event) =>{
        event.preventDefault();
        const email = document.getElementById("emailId").value;
        const pwd = document.getElementById("password").value;
        axios.post('/merchant', {
            email: email,
            pwd: pwd
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render = () => {
        return (
            <div className="App-header">
                <form>
                    <div className="form-group">
                        <label for="emailId">Email</label>
                        <input type="email" className="form-control" id="emailId" aria-describedby="emailHelp" placeholder="Enter email adress" required />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter the Password" required />
                    </div>
                    <button type="submit" value="login" onClick={this.handleLogin} className="btn btn-secondary btn-lg btn-block">Login</button>
                </form>
                <Link to="/SignUpResturant" className="loginLink">Create an account</Link>
            </div >
        )

    }
}

export default Login