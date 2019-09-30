import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

    render = () => {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/HomePage" class="navbar-brand"  >Grubhub</Link>
                <div class="collapse navbar-collapse" id="navbarText" />
                <form class="form-inline my-2 my-lg-0">
                    <div className="col">
                        <div class="dropdown">
                            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Hi {this.props.full_name}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <Link to="/Profile" class="dropdown-item"  >Profile</Link>
                                <Link to={{ pathname: `BuyerOrders`,state: { flag: 0, desc : 'Upcoming Orders'}, search : "0"}} class="dropdown-item"  >Upcoming orders</Link>
                                <Link to={{ pathname: `BuyerOrders`,state: { flag: 1, desc : 'Past Orders'},search : "1" }} class="dropdown-item"  >Past orders</Link>
                                <Link to="/SignOut" class="dropdown-item"  >Sign out</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <i class="fa fa-shopping-cart" aria-hidden="true" style={{ color: "#ffffff" }}></i>
                    </div>

                </form>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        full_name: state.LoginReducer.full_name
    }
}

export default connect(mapStateToProps)(Navbar)