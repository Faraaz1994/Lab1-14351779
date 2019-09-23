import { Redirect } from 'react-router-dom';
import React from 'react';
import img6 from './images/img6.jpg'
import { connect } from 'react-redux';
import { fetchProfile, updateProfile } from './actions/LoginActions'
import BusyIndicator from './BusyIndicator'


class ProfileResturant extends React.Component {
    componentDidMount() {
        this.props.fetchProfile();
    }
    handleupdate = (event) => {
        event.preventDefault();
        const merchant_name = document.getElementById("MerchantName").value;
        const street = document.getElementById("Address").value;
        const city = document.getElementById("City").value
        let state = document.getElementById("State");
        state = state.item(state.selectedIndex).value;
        const email_id = document.getElementById("Email").value;
        const zipcode = document.getElementById("Zip").value;
        const mobile_no = document.getElementById("mobileno").value;
        const resturant_name = document.getElementById("RestName").value;
        const cuisine = document.getElementById("Cuisine").value;
        var that = this;
        this.props.updateProfile({
            merchant_name,
            email_id,
            address_id: that.props.profileDetails[0].address_id,
            mobile_no,
            street,
            city,
            state,
            zipcode,
            resturant_name,
            cuisine,
            id: that.props.profileDetails[0].id
        })

    }
    openImageUploader = (event) => {
        this.refs.fileUploader.click();
    }

    render() {
        if (!this.props.profileDetails) {
            return <BusyIndicator />
        }
        return (
            <div className="App-header">
                <input type="image" src={img6} alt="Avatar" class="avatar" onClick={this.openImageUploader} />
                <input type="file" id="file" ref="fileUploader" style={{ display: "none" }} />
                <br /> <br />
                <form onSubmit={this.handleupdate}>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <input type="text" className="form-control" name="full_name"
                                id="MerchantName" required defaultValue={this.props.profileDetails[0].merchant_name}
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
                                <option>CA</option>
                                <option>AZ</option>
                                <option>AS</option>
                                <option>FG</option>
                                <option>QW</option>
                                <option>PO</option>
                                <option>QW</option>
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <input type="text" className="form-control" id="Zip" name="zipcode"
                                required defaultValue={this.props.profileDetails[0].zipcode} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="email" className="form-control" id="Email" required
                                defaultValue={this.props.profileDetails[0].email_id} name="email_id" />
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="mobileno" name="mobile_no"
                                placeholder="Mobile number" required defaultValue={this.props.profileDetails[0].mobile_no} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="RestName" required
                                defaultValue={this.props.profileDetails[0].resturant_name} name="resturant_name" />
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="Cuisine" name="cuisine"
                                placeholder="Cuisine" required defaultValue={this.props.profileDetails[0].cuisine} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary btn-lg btn-block">Update</button>
                </form>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        profileDetails: state.ProfileReducer.profileDetails,
        updateDetails: state.ProfileReducer.updateDetails
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProfile: (id) => { dispatch(fetchProfile(id,'/merchant')) },
        updateProfile: (profileDetails) => { dispatch(updateProfile(profileDetails,'/merchant')) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileResturant)
