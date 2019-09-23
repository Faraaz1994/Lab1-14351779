import React from 'react';
import { Redirect } from 'react-router-dom';
import NavbarResturant from './NavbarResturant'

class HomePageResturant extends React.Component{

    render(){
        return (
            <div>
                <NavbarResturant />
            </div>
        )
    }
}

export default HomePageResturant;