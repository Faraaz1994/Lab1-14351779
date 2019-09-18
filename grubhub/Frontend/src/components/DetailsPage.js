import React from 'react';
import Navbar from './Navbar';
import img1 from './images/img1.jpg'
const axios = require('axios');


class DetailPage extends React.Component {

    constructor(props) {
        super(props);
        const { resturantId } = this.props.location.state;
        this.fetchResturantDetails(resturantId);

    }

    async fetchResturantDetails(resturantId) {
        try {
            const response = await axios.get('/resturant/id', {
                params: {
                    resturantId: resturantId
                }
            });
            console.log(response.data.data);
            this.getItemsBasedOnSection(response.data.data);

        } catch (error) {
            console.error(error);
        }
    }

    getItemsBasedOnSection =(items) =>{
        const group = items.reduce((object, item) => {
            if (object[item.section] === undefined ) {
              object[item.section] = [];
            }     
           object[item.section].push(item);
            return object;
          }, {})

    console.log(group);
    }

    renderresturantDetails = () => {
        return (
            <div class="card">
                <img class="card-img-top" src={img1} alt="" style={{ height: "16rem" }} />
                <div class="card-body">
                    <h5 class="card-title">Empire Hotel</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        )
    }
    renderSection = () => {
        return (
            <div class="card text-center">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Active</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    {this.renderItems()}
                </div>
            </div>

        )
    }
    renderItems = () => {
        return (
            <div class="card-deck">
                <div class="card">
                    <img class="card-img-top" src="..." alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="..." alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="..." alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
            </div>
        )
    }
    render = () => {
        return (
            <div>
                <Navbar />
                <div class="row">
                    <div class="clm-l" >
                        {this.renderresturantDetails()}
                        {this.renderSection()}
                    </div>
                    <div class="clm-s" style={{ backgroundColor: "#bbb" }}>
                        <h2>Column 2</h2>
                        <p>Some text..</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailPage

