import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import img1 from './images/img1.jpg'
import img2 from './images/img2.jpg'
import img3 from './images/img3.jpg'
import img4 from './images/img4.jpg'
import img5 from './images/img5.jpg'
import img6 from './images/img6.jpg'


class HomePage extends React.Component {

    state ={
        isRedirect : false
    }

    handleClick = () =>{
        this.setState({
            isRedirect : true
        })
    }
    render = () => {

        if(this.state.isRedirect){
            return  <Redirect to='/SearchPage' />
        }
        
        return (
            <div>
                <nav class="navbar navbar-expand-md bg-dark navbar-dark">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="bd-example" >
                    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                        <div class="form-group searchBar">
                            <div class="container">
                                <div class="row">
                                    <div class="col-6">
                                        <input type="text" class="form-control input-lg" placeholder="Enter the dish" />
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control input-lg" name="start" placeholder="zip code" />
                                    </div>
                                    <div class="col-3">
                                        <button class="btn btn-success" onClick={this.handleClick} role="button">GO</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="5"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src={img1} class="d-block w-100" alt="..." height="720" />

                            </div>
                            <div class="carousel-item">
                                <img src={img2} class="d-block w-100" alt="..." height="720" />
                                <div class="carousel-caption d-none d-md-block">

                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src={img3} class="d-block w-100" alt="..." height="720" />
                                <div class="carousel-caption d-none d-md-block">

                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src={img4} class="d-block w-100" alt="..." height="720" />
                                <div class="carousel-caption d-none d-md-block">

                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src={img5} class="d-block w-100" alt="..." height="720" />

                            </div>
                            <div class="carousel-item">
                                <img src={img6} class="d-block w-100" alt="..." height="720" />

                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div >
            </div>
        )
    }
}
export default HomePage