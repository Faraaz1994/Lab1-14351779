import React from 'react';

class NavbarResturant extends React.Component {

    render = () => {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/HomePageResturant">Grubhub</a>
                <div class="collapse navbar-collapse" id="navbarText" />
                <form class="form-inline my-2 my-lg-0">
                    <div className="col">
                        <div class="dropdown">
                            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Hi Alex
                            </a>

                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item" href="/ProfileResturant">Profile</a>
                            </div>
                        </div>
                    </div>
{/*                     <div className="col">
                        <i class="fa fa-shopping-cart" aria-hidden="true" style={{ color: "#ffffff" }}></i>
                    </div> */}

                </form>
            </nav>
        )
    }
}

export default NavbarResturant