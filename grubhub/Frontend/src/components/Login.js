import { Link, Redirect } from 'react-router-dom';
import React from 'react';
const axios = require('axios');


class Login extends React.Component {

    state = {
        isAuthenticated: false
    }

    handleLogin = (event) => {
        event.preventDefault();
        const email = document.getElementById("emailId").value;
        const pwd = document.getElementById("password").value;
        var that = this;
        axios.post('/buyer', {
            email: email,
            pwd: pwd
        })
            .then(function (response) {
                console.log(response);
                if (response.data.error === false) {
                    that.setState({
                        isAuthenticated: true
                    })
                }
                else {
                    that.setState({
                        isAuthenticated: false
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render = () => {

        if (this.state.isAuthenticated) {
            return <Redirect to='/HomePage' />
        }
        else {
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
                    <Link to="/signup" className="loginLink">Create an account</Link>
                    <Link to="/LoginResturant" className="loginLink">Resturants</Link>
                </div >
            )
        }

    }
}

export default Login