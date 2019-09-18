import React from 'react';

class Navbar extends React.Component {

    render = () => {
        return (
            <nav class="navbar navbar-expand-md bg-dark navbar-dark">
                <a class="navbar-brand" href="/Homepage">GRUBHUB</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </nav>
        )
    }
}

export default Navbar