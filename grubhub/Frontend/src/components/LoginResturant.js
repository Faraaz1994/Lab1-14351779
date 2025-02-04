import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { authenticateLogin,resolveError } from './actions/LoginActions'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Login extends React.Component {
    handleLogin = (event) => {
        event.preventDefault();
        const email = document.getElementById("emailId").value;
        const pwd = document.getElementById("password").value;
        this.props.authenticateLogin(email, pwd);
    }
    componentDidUpdate = ()=>{
        if(this.props.Error.isError){
            this.displayError()
        }
    }
    displayError = () => {
        let that = this;
        confirmAlert({
            title: 'Warning',
            message: that.props.Error.errorText,
            buttons: [
                {
                    label: 'Yes'
                }
            ]
        });
    }
    render = () => {
        if (this.props.isAuthenticated || cookie.load('cookie')) {
            return <Redirect to='/HomePageResturant' />
        }
        else {
            return (
                <div className="App-header">
                    <form onSubmit={this.handleLogin}>
                        <div className="form-group">
                            <label for="emailId">Email</label>
                            <input type="email" className="form-control" id="emailId" aria-describedby="emailHelp" placeholder="Enter email adress" required />
                        </div>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter the Password" required />
                        </div>
                        <button type="submit" value="login" className="btn btn-secondary btn-lg btn-block">Login</button>
                    </form>
                    <Link to="/SignUpResturant" className="loginLink">Create an account</Link>
                    {this.props.Error.isError && this.displayError() }
                </div >
            )

        }
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.LoginReducer.isAuthenticated,
        Error: state.ErrorReducer,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticateLogin: (email, pwd) => { dispatch(authenticateLogin(email, pwd, '/merchant')) },
        resolveError: () => { dispatch(resolveError()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)