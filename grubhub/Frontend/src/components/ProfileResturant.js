import { Redirect } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { fetchProfile, updateProfile, updateImage, updateResturantImage, fetchResturantImages } from './actions/LoginActions'
import BusyIndicator from './BusyIndicator'
import NavbarResturant from './NavbarResturant'
const axios = require('axios');


class ProfileResturant extends React.Component {
    componentDidMount() {
        this.props.fetchProfile();
        this.props.fetchResturantImages();
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
        if (event.target.name == "resturantImage") {
            this.refs.fileUploaderResturant.click();
        }
        else {
            this.refs.fileUploader.click();
        }

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
    handleResturantImageUpload = (files) => {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append(
                'profileImage',
                files[i],
                files[i].name
            );
        }
        this.props.updateResturantImage(formData);
    }
    renderCarouselImages = () => {
        if (this.props.resturantImages) {
            if (this.props.resturantImages.length === 0) {
                return (
                    <div className="carousel-item active">
                        <img class="d-block w-100" src="/images/defaultresturant.jpg" name="resturantImage" onClick={this.openImageUploader} alt="First slide" style={{ height: "20rem" }} />
                    </div>
                )
            }
            return this.props.resturantImages.map((item, index) => {
                let className = "carousel-item"
                if (index == 0) {
                    className = "carousel-item active";
                }
                return (
                    <div className={className}>
                        <img class="d-block w-100" src={item.image_name} name="resturantImage" onClick={this.openImageUploader} alt="First slide" style={{ height: "20rem" }} />
                    </div>
                )
            });
        }
    }

    renderCarousel = () => {
        return (
            <div id="resturantCarousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    {this.renderCarouselImages()}
                </div>
                <a class="carousel-control-prev" href="#resturantCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#resturantCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                <div className="overlay" style={{ position: "absolute", top: "10px", right: "43%" }}>
                    <div class="row">
                        <div class="col-xs-6"  >
                            <input type="image" src={this.props.profileDetails[0].profile_image} alt="Avatar" class="avatar" onClick={this.openImageUploader} />
                            <input type="file" id="file" ref="fileUploader" style={{ display: "none" }} onChange={(e) => this.handleImageUpload(e.target.files[0])} />
                            <input type="file" ref="fileUploaderResturant" multiple style={{ display: "none" }} onChange={(e) => this.handleResturantImageUpload(e.target.files)} />
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    render() {
        console.log(this.props, "props");
        if (this.props.profileDetails == null || this.props.isLoading) {
            return <BusyIndicator />
        }
        return (
            <div>
                <NavbarResturant />
                <div className="App-header">
                    {this.renderCarousel()}
                    <br />
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
                            <div className="form-group col-md-6">
                                <input type="email" className="form-control" id="Email" required readOnly
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
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        profileDetails: state.ProfileReducer.profileDetails,
        isLoading: state.ProfileReducer.isLoading,
        resturantImages: state.ProfileReducer.resturantImages
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProfile: () => { dispatch(fetchProfile('/merchant')) },
        fetchResturantImages: () => { dispatch(fetchResturantImages()) },
        updateProfile: (profileDetails) => { dispatch(updateProfile(profileDetails, '/merchant')) },
        updateImage: (image) => { dispatch(updateImage(image, '/merchant')) },
        updateResturantImage: (images) => { dispatch(updateResturantImage(images)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileResturant)
