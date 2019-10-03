import { Redirect } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { createProfile,resolveError } from './actions/LoginActions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class SignUpResturant extends React.Component {

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
        const RName = document.getElementById("RName").value;
        this.props.createProfile({
            FullName: FullName,
            Address: Address,
            City: City,
            State: State,
            Email: Email,
            Zip: Zip,
            Password: Password,
            RName: RName
        });
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
                    label: 'OK',
                    onClick: () => { that.props.resolveError() }
                }
            ]
        });
    }

    render = () => {
        if (this.props.isAccountCreated) {
            return <Redirect to='/HomePageResturant' />
        }
        return (
            <div className="App-header">
                <form onSubmit={this.handleSignIn}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>First Name</label>
                            <input type="text" className="form-control" id="FName" placeholder="First Name" required maxLength="15"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label >Last Name</label>
                            <input type="text" className="form-control" id="LName" placeholder="Last Name" required maxLength="15" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Resturant name</label>
                        <input type="text" className="form-control" id="RName" placeholder="Resturant Name" required maxLength="30"/>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" id="Address" placeholder="1234 Main St" required maxLength="30"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label >City</label>
                            <input type="text" className="form-control" id="City" required maxLength="15"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>State</label>
                            <select id="State" className="form-control" required>
                                <option selected>Choose...</option>
                                <option>AL</option>
                                <option>AK</option>
                                <option>AZ</option>
                                <option>CA</option>
                                <option>FL</option>
                                <option>KS</option>
                                <option>NJ</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label >Zip</label>
                            <input type="text" className="form-control" id="Zip" required maxLength="6"/>
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
                    <button type="submit" className="btn btn-secondary btn-lg btn-block" >Sign in</button>
                </form>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        isAccountCreated: state.ProfileReducer.isAccountCreated,
        Error: state.ErrorReducer,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (profileDetails) => { dispatch(createProfile(profileDetails, '/merchant')) },
        resolveError: () => { dispatch(resolveError()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpResturant)