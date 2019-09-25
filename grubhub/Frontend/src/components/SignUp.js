import { Redirect } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { createProfile } from './actions/LoginActions';


class SignUp extends React.Component {

    handleSignIn = (event) => {
        event.preventDefault();
        const FullName = document.getElementById("FName").value + " " + document.getElementById("LName").value;
        const Address = document.getElementById("Address").value;
        const City = document.getElementById("City").value
        let State = document.getElementById("State");
        State = State.item(State.selectedIndex).value;
        const Email = document.getElementById("Email").value;
        const Zip = document.getElementById("Zip").value;
        const Password = document.getElementById("Password").value;
        this.props.createProfile({
            FullName: FullName,
            Address: Address,
            City: City,
            State: State,
            Email: Email,
            Zip: Zip,
            Password: Password
        });
    }

    render = () => {
        if (this.props.isAccountCreated) {
            return <Redirect to='/HomePage' />
        }
        return (
            <div className="App-header">
                <form onSubmit={this.handleSignIn}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>First Name</label>
                            <input type="text" className="form-control" id="FName" placeholder="First Name" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label >Last Name</label>
                            <input type="text" className="form-control" id="LName" placeholder="Last Name" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" id="Address" placeholder="1234 Main St" required />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label >City</label>
                            <input type="text" className="form-control" id="City" required />
                        </div>
                        <div className="form-group col-md-4">
                            <label>State</label>
                            <select id="State" className="form-control" required>
                                <option selected>Choose...</option>
                                <option>CA</option>
                                <option>CA</option>
                                <option>CA</option>
                                <option>CA</option>
                                <option>CA</option>
                                <option>CA</option>
                                <option>CA</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label >Zip</label>
                            <input type="text" className="form-control" id="Zip" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label >Email</label>
                            <input type="email" className="form-control" id="Email" placeholder="Email" required />
                        </div>
                        <div className="form-group col-md-12">
                            <label>Password</label>
                            <input type="password" className="form-control" id="Password" placeholder="Password" required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary btn-lg btn-block">Sign in</button>
                </form>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        isAccountCreated: state.ProfileReducer.isAccountCreated,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (profileDetails) => { dispatch(createProfile(profileDetails, '/buyer')) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)