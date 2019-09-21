import { Redirect } from 'react-router-dom';
import React from 'react';
import img6 from './images/img6.jpg'

class Profile extends React.Component {

    render() {
        return (
            <div className="App-header">
                <img src={img6} alt="Avatar" class="avatar" />
                <br /> <br />
                <form onSubmit={this.handleSignIn}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="FName" placeholder="First Name" required />
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="LName" placeholder="Last Name" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="Address" placeholder="1234 Main St" required />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="City" required />
                        </div>
                        <div className="form-group col-md-4">
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
                            <input type="text" className="form-control" id="Zip" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <input type="email" className="form-control" id="Email" placeholder="Email" required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary btn-lg btn-block">Update</button>
                </form>
            </div>


        )
    }

}

export default Profile;