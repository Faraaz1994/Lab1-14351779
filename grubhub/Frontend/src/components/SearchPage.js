import React from 'react';
import img5 from './images/img5.jpg'
import Navbar from './Navbar'
import { Redirect } from 'react-router-dom';
const axios = require('axios');


class SearchPage extends React.Component {

    state = {
        tableData: [],
        isRedirect: false
    }

    constructor(prop) {
        super(prop);
        const { dish, zip } = this.props.location.state
        this.fetchResturant(dish, zip);
    }
    async fetchResturant(dish, zip) {
        try {
            const response = await axios.get('/resturant', {
                params: {
                    dish: dish,
                    zip: zip
                }
            });
            console.log(response.data.data);
            this.setState({
                tableData: response.data.data
            })
        } catch (error) {
            console.error(error);
        }
    }
    handleResturantClick = (event) => {
        this.setState({
            isRedirect: true,
            resturantId: event.currentTarget.getAttribute("data-resturantid")
        })
    }
    handleFilter = (event) => {
        const value = event.target.value;
        window.$("#table tr").filter(function () {
            window.$(this).toggle(
                window.$(this).text().toLowerCase().indexOf(value) > -1
            )
        });
    }
    renderTable = (rows) => {
        return rows.map((resturant, index) => {
            const { id, resturant_name, cuisine } = resturant;
            return (
                <tr onClick={this.handleResturantClick} data-resturantid={id}>
                    <th className="searchPageTD" scope="row">{index + 1}</th>
                    <td className="w-25 searchPageTD">
                        <img src={img5} className="img-fluid img-thumbnail searchPageImageThumbnail" alt="" />
                    </td>
                    <td className="searchPageTD">
                        {resturant_name}
                        <p>{cuisine}</p>
                    </td>
                    <td className="searchPageTD">
                        <span class="fa fa-star checked" ></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </td>
                    <td className="searchPageTD">
                        <i class="fa fa-dollar" />
                        <i class="fa fa-dollar" />
                        <i class="fa fa-dollar" />
                    </td>
                    <td className="searchPageTD">
                        <h6>$0</h6>
                        <p>minimum</p>
                    </td>
                </tr>
            )
        });

    }
    render = () => {
        if (this.state.isRedirect) {
            return <Redirect to={{
                pathname: '/DetailsPage',
                state: {
                    resturantId: this.state.resturantId
                }
            }} />

        }
        return (
            <div>
                <Navbar />
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8" />
                        <div class="col-sm-4">
                            <div class="dropdown" style={{ float: "right" }}>
                                <span>Filter : </span>
                                <button className="btn btn-light" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    select cuisine
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button class="dropdown-item" value="arabian" onClick={this.handleFilter}>Arabian</button>
                                    <button class="dropdown-item" value="thai" onClick={this.handleFilter}>Thai</button>
                                    <button class="dropdown-item" value="indian" onClick={this.handleFilter}>Indian</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <table id="table" class="table table-image">
                                <tbody>
                                    {this.renderTable(this.state.tableData)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default SearchPage