import React from 'react';
const axios = require('axios');

class SignUp extends React.Component {

    handleSignIn = (event) => {
        event.preventDefault();
        const FullName = document.getElementById("FName").value + document.getElementById("LName").value;
        const Address = document.getElementById("Address").value;
        const City = document.getElementById("City").value
        let State = document.getElementById("State");
        State = State.item(State.selectedIndex).value;
        const Email = document.getElementById("Email").value;
        const Zip = document.getElementById("Zip").value;
        const Password = document.getElementById("Password").value;
        axios.post('/buyer/signup', {
            FullName : FullName,
            Address : Address,
            City : City,
            State : State,
            Email : Email,
            Zip : Zip,
            Password : Password
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
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>First Name</label>
                            <input type="text" className="form-control" id="FName" placeholder="First Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label >Last Name</label>
                            <input type="text" className="form-control" id="LName" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" id="Address" placeholder="1234 Main St" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label >City</label>
                            <input type="text" className="form-control" id="City" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>State</label>
                            <select id="State" className="form-control">
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
                            <input type="text" className="form-control" id="Zip" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label >Email</label>
                            <input type="email" className="form-control" id="Email" placeholder="Email" />
                        </div>
                        <div className="form-group col-md-12">
                            <label>Password</label>
                            <input type="password" className="form-control" id="Password" placeholder="Password" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary btn-lg btn-block" onClick={this.handleSignIn}>Sign in</button>
                </form>
            </div>
        )

    }
}

export default SignUp