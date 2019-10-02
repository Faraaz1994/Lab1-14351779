import React from 'react';
import { connect } from 'react-redux';
import { fetchProfile, updateProfile, updateImage } from './actions/LoginActions'
import BusyIndicator from './BusyIndicator'
import Navbar from './Navbar'
const axios = require('axios');

class Profile extends React.Component {
    componentDidMount() {
        this.props.fetchProfile();
    }
    handleupdate = (event) => {
        event.preventDefault();
        const full_name = document.getElementById("FName").value;
        const street = document.getElementById("Address").value;
        const city = document.getElementById("City").value
        let state = document.getElementById("State");
        state = state.item(state.selectedIndex).value;
        const email_id = document.getElementById("Email").value;
        const zipcode = document.getElementById("Zip").value;
        const mobile_no = document.getElementById("mobileno").value;
        var that = this;
        this.props.updateProfile({
            full_name,
            email_id,
            address_id: that.props.profileDetails[0].address_id,
            mobile_no,
            street,
            city,
            state,
            zipcode,
            id: that.props.profileDetails[0].id
        })

    }
    openImageUploader = (event) => {
        this.refs.fileUploader.click();
    }
    handleImageUpload = (file) => {
        const formData = new FormData()
        formData.append(
            'profileImage',
            file,
            file.name
        );
        this.props.updateImage(formData);
    }

    render() {
        if (this.props.profileDetails == null || this.props.isLoading) {
            return <BusyIndicator />
        }
        return (
            <div>
                <Navbar />
                <div className="App-header">
                    <input type="image" src={this.props.profileDetails[0].profile_image} alt="Avatar" class="avatar" onClick={this.openImageUploader} />
                    <input type="file" id="file" ref="fileUploader" style={{ display: "none" }} onChange={(e) => this.handleImageUpload(e.target.files[0])} />
                    <br /> <br />
                    <form onSubmit={this.handleupdate}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <input type="text" className="form-control" name="full_name"
                                    id="FName" required defaultValue={this.props.profileDetails[0].full_name}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="Address"
                                required defaultValue={this.props.profileDetails[0].street} name="street" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-5">
                                <input type="text" className="form-control" id="City" name="city"
                                    required defaultValue={this.props.profileDetails[0].city} />

                            </div>
                            <div className="form-group col-md-4">
                                <select id="State" className="form-control" required defaultValue={this.props.profileDetails[0].state} >
                                    <option>AL</option>
                                    <option>AK</option>
                                    <option>AZ</option>
                                    <option>CA</option>
                                    <option>FL</option>
                                    <option>KS</option>
                                    <option>NJ</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <input type="text" className="form-control" id="Zip" name="zipcode"
                                    required defaultValue={this.props.profileDetails[0].zipcode} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <input type="email" className="form-control" id="Email" required readOnly
                                    defaultValue={this.props.profileDetails[0].email_id} name="email_id" />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="text" className="form-control" id="mobileno" name="mobile_no"
                                    placeholder="Mobile number" required defaultValue={this.props.profileDetails[0].mobile_no} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-secondary btn-lg btn-block">Update</button>
                    </form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        profileDetails: state.ProfileReducer.profileDetails,
        isLoading: state.ProfileReducer.isLoading,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProfile: () => { dispatch(fetchProfile('/buyer')) },
        updateProfile: (profileDetails) => { dispatch(updateProfile(profileDetails, '/buyer')) },
        updateImage: (image) => { dispatch(updateImage(image, '/buyer')) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
