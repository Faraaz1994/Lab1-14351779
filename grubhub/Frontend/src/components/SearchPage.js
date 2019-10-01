import React from 'react';
import img5 from './images/img5.jpg'
import Navbar from './Navbar'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchResturant, fetchCuisine } from './actions/LoginActions';


class SearchPage extends React.Component {

    state = {
        isRedirect: false
    }

    constructor(prop) {
        super(prop);
        const { dish, zip } = this.props.location.state
        this.props.fetchResturant(dish, zip);
        this.props.fetchCuisine();
    }
    handleResturantClick = (event) => {
        this.setState({
            isRedirect: true,
            resturantId: event.currentTarget.getAttribute("data-resturantid"),
            resturant_name: event.currentTarget.getAttribute("data-resturant_name"),
            cuisine: event.currentTarget.getAttribute("data-cuisine")
        })
    }
    handleFilter = (event) => {
        let value = event.target.value;
        if(value =="All"){
            value = ""
        }
        window.$("#table tr").filter(function () {
            window.$(this).toggle(
                window.$(this).text().toLowerCase().indexOf(value.toLowerCase()) > -1
            )
        });
    }
    renderCuisineDropDown = () => {
        debugger

        let items = [{cuisine : "All"}];
        items.push(...this.props.cuisine);
        return items.map((item) => {
            return (<button class="dropdown-item" value={item.cuisine} onClick={this.handleFilter}>{item.cuisine}</button>)
        });
    }
    renderTable = (rows) => {
        if (rows.length == 0) {
            return (
                <tr style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: "4rem", fontFamily: "fantasy" }}>
                    <td >
                        No resturants found
                </td>
                </tr>
            )
        }
        return rows.map((resturant, index) => {
            const { id, resturant_name, cuisine } = resturant;
            return (
                <tr onClick={this.handleResturantClick} data-resturantid={id} data-resturant_name={resturant_name} data-cuisine={cuisine}>
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
                    resturantId: this.state.resturantId,
                    resturant_name: this.state.resturant_name,
                    cuisine: this.state.cuisine
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
                                    {this.props.cuisine && this.renderCuisineDropDown()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <table id="table" class="table table-image">
                                <tbody>
                                    {this.props.resturants && this.renderTable(this.props.resturants)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    console.log(state, "State")
    return {
        resturants: state.ResturantReducer.resturants,
        cuisine: state.ResturantReducer.cuisine

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchResturant: (dish, zip) => { dispatch(fetchResturant(dish, zip)) },
        fetchCuisine: () => { dispatch(fetchCuisine()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)