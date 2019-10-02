import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
class NavbarResturant extends React.Component {

    render = () => {
        console.log("profiledetails",this.props.profileDetails);
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/HomePageResturant" class="navbar-brand"  >Grubhub</Link>
                <div class="collapse navbar-collapse" id="navbarText" >
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link to="/HomePageResturant" class="navbar-brand active"  >Orders</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/Menu" class="navbar-brand"  >Menu</Link>
                        </li>
                    </ul>
                </div>
                <form class="form-inline my-2 my-lg-0">
                    <div className="col">
                        <div class="dropdown">
                            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Hi  {this.props.profileDetails && this.props.profileDetails[0].merchant_name}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <Link to="/ProfileResturant" class="dropdown-item"  >Profile</Link>
                                <Link to="/ResturantOrders" class="dropdown-item"  >Past Orders</Link>
                                <Link to="/SignOut" class="dropdown-item"  >Sign out</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileDetails: state.ProfileReducer.profileDetails,
    }
}

export default connect(mapStateToProps)(NavbarResturant)