import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Redirect } from 'react-router-dom';
const axios = require('axios');


class DetailPage extends React.Component {
    state = {
        sectionDetails: null,
        activeSection: null,
        latestItemId: null,
        latestItemName: null,
        shoppingCart: [],
        resturantimage: null
    }

    constructor(props) {
        super(props);
        const { resturantId } = this.props.location.state;
        this.setUp(resturantId);
    }
    setUp = (resturantId) =>{
        this.fetchResturantDetails(resturantId);
        this.getImage(resturantId);
    }

    checkCartAvailable =()=>{
        const { resturantId } = this.props.location.state;
        let cart = JSON.parse(localStorage.getItem("cart_"+this.props.profileDetails[0].id));
        if(cart && (resturantId != cart.resturantId)){
           this.showAlertCart("You already have some items in a cart from different resturant. Do you want to remove the items?",cart.resturantId)
        }
        else if(cart && (resturantId == cart.resturantId)){
            this.setState({
                shoppingCart : cart.items
            })
        }
    }

    showAlertCart = (msg,resturantId) => {
        confirmAlert({
            title: 'Attention',
            message: msg,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.setState({
                            shoppingCart : []
                        })
                        localStorage.removeItem("cart_"+this.props.profileDetails[0].id)
                    }
                },
                {
                    label: 'No',
                    onClick: () => { 
                        this.props.history.push({pathname :'/SearchPage',state : {zip : "" , dish : ""} }); 
                    }
                }
            ]
        });
    }

    componentDidMount() {

        this.checkCartAvailable();

        //called before opening the modal
        window.$('#exampleModalCenter').on('show.bs.modal', function (event) {
            window.$.find("#inpQty")[0].value = 1;
            const price = window.$(event.relatedTarget)[0].dataset.price;
            window.$(this).find(".price").text("$ " + price);
        });

        //called after the user inputs the qty and clicks on order
        window.$("#btnOrder").on("click", function (event) {
            let items = this.state.shoppingCart;
            let itemName = this.state.latestItemName;
            let itemId = this.state.latestItemId;
            let bPush = true;
            let totalPrice = 0;
            //check  of item is already present in the cart
            for (let i = 0; i < items.length - 1; i++) {
                if (items[i].itemId === itemId) {
                    items[i].qty = parseInt(items[i].qty) + parseInt(window.$.find("#inpQty")[0].value);
                    items[i].price = parseFloat(items[i].price) + parseFloat(window.$.find(".price")[0].innerText.substring(2))
                    bPush = false;
                }
                totalPrice += items[i].price;
            }
            if (bPush) {
                items.splice(items.length - 1, 0, {
                    price: parseFloat(window.$.find(".price")[0].innerText.substring(2)),
                    qty: parseInt(window.$.find("#inpQty")[0].value),
                    itemName: itemName,
                    itemId: itemId
                })
                totalPrice += parseFloat(window.$.find(".price")[0].innerText.substring(2));
            }

            //push the total price
            if (items.length === 1) {
                totalPrice = items[0].price;
                items.push({
                    price: totalPrice,
                    qty: "",
                    itemName: "Cart total",
                    itemId: ""
                })
            }
            else {
                items[items.length - 1].price = totalPrice
            }

            this.setState({
                shoppingCart: items
            });
            window.$.find("#inpQty")[0].value = 1;

            this.storeCart(items);
        }.bind(this));
    }
    storeCart =(items) =>{
        let buyer_rest ={
            resturantId : this.props.location.state.resturantId,
            items : items,
            buyer_id : this.props.profileDetails[0].id
       }
       localStorage.setItem("cart_"+buyer_rest.buyer_id, JSON.stringify(buyer_rest));
    }
    beforeModelOpen = (event) => {
        this.setState({
            latestItemId: event.target.dataset.latestitemid,
            latestItemName: event.target.dataset.latestitemname
        })
    }

    showAlert = (msg) => {
        confirmAlert({
            title: 'Order details',
            message: msg,
            buttons: [
                {
                    label: 'Ok'
                }
            ]
        });
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

    getItemsBasedOnSection = (items) => {
        const sections = items.reduce((object, item) => {
            if (object[item.section_text] === undefined) {
                object[item.section_text] = [];
            }
            object[item.section_text].push(item);
            return object;
        }, {})
        this.setState({
            sectionDetails: sections,
            activeSection: Object.keys(sections)[0]
        })
    }

    async getImage(resturantId) {
        try {
            const response = await axios.get('/resturant/resturantimage', {
                params: {
                    resturantId: resturantId
                }
            });
            this.setState({
                resturantimage: response.data.data[0].image_name
            })

        } catch (error) {
            console.error(error);
        }
    }

    renderResturantDetails = () => {
        const { resturant_name, cuisine, resturantId } = this.props.location.state;
        return (
            <div class="card">
                <img class="card-img-top" src={this.state.resturantimage} alt="" style={{ height: "16rem" }} />
                <div class="card-body">
                    <h5 class="card-title">{resturant_name}</h5>
                    <p class="card-text">{cuisine}</p>
                </div>
            </div>
        )
    }
    handleSection = (event) => {
        this.setState({
            activeSection: event.target.value
        })
    }
    renderSection = (sections) => {
        let listItem = [];
        if (sections) {
            for (let [section, items] of Object.entries(sections)) {
                let item = <li class="nav-item">
                    <button class="btn btn-link" value={section} onClick={this.handleSection}>{section}</button>
                </li>
                listItem.push(item)
            }
            return listItem
        }
        return null
    }
    openModal = () => {
        return (
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Order Confirmation</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col" style={{ textAlign: "right" }}>
                                    <span> Quantity : </span>
                                </div>
                                <div className="col" >
                                    <input type="number" id="inpQty" style={{ width: "45%" }} defaultValue="1" onChange={this.calculatePrice} max="10" min="1" />
                                </div>
                                <div className="col" >
                                    <span> Price : </span>
                                </div>
                                <div className="col" >
                                    <span className="price">   </span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" id="btnOrder" class="btn btn-primary" data-dismiss="modal" >Order</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    calculatePrice = (event) => {
        const qty = event.target.value;
        const price = window.$.find("#modalButton")[0].dataset.price;
        window.$.find(".price")[0].innerText = "$ " + (qty * price);
    }

    renderItems = () => {
        let cards = [];
        const { sectionDetails, activeSection } = this.state;
        if (sectionDetails && activeSection) {
            let items = sectionDetails[activeSection];
            items.forEach(item => {
                cards.push(<div class="card">
                    <img class="card-img-top" src={item.image_name} style={{ width: "110px", height: "110px", margin: "auto" }} alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">{item.name}</h5>
                        <p class="card-text">{item.description}</p>
                        <button type="button" class="btn btn-primary" id="modalButton" data-toggle="modal" onClick={this.beforeModelOpen}
                            data-target="#exampleModalCenter" data-latestitemid={item.id} data-latestitemname={item.name} data-price={item.price}>
                            Order Now
                        </button>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last ordered {Math.floor(Math.random() * 10)} mins ago</small>
                    </div>
                </div>)
            });

        }
        return cards;
    }
    deleteItem = (event) => {
        let items = this.state.shoppingCart;
        items.splice(event.target.dataset.index, 1);
        items[items.length - 1].price = 0;
        for (let i = 0; i < items.length - 1; i++) {
            items[items.length - 1].price += items[i].price;
        }
        if (items.length == 1) {
            items = []
        }
        this.setState({
            shoppingCart: items
        })
    }

    renderShoppingCart = () => {
        var that = this;
        return this.state.shoppingCart.map((item, index) => {
            const { itemName, qty, price, itemId } = item;
            return (
                <tr>
                    <th scope="row">{itemId && index + 1}</th>
                    <th>{itemName}</th>
                    <th>{qty} </th>
                    <th>{price}</th>
                    <th onClick={that.deleteItem}>
                        {itemId && <i class="fa fa-trash" aria-hidden="true" data-index={index}></i>}
                    </th>
                </tr>
            )
        });
    }
    placeOrder = () => {
        const { resturantId } = this.props.location.state;
        const { shoppingCart } = this.state;
        var that = this;
        axios.post('/order', {
            resturantId: resturantId,
            items: shoppingCart
        })
            .then(function (response) {
                console.log(response);
                if (response.data.error === false) {
                    that.setState({
                        shoppingCart: []
                    });
                    that.showAlert("Order placed succesfully");
                    localStorage.removeItem("cart_"+that.props.profileDetails[0].id)
                }
                else {
                    that.showAlert("Order wasnt placed. Please try again in sometime ");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    render = () => {
        return (
            <div>
                <Navbar />
                <div class="row">
                    <div class="clm-l" >
                        {this.renderResturantDetails()}
                        <div class="card text-center" >
                            <div class="card-header">
                                <ul class="nav nav-tabs card-header-tabs">
                                    {this.renderSection(this.state.sectionDetails)}
                                </ul>
                            </div>
                            <div class="card-deck">
                                {this.renderItems()}
                            </div>
                        </div>
                    </div>
                    <div class="clm-s" style={{ backgroundColor: "#343a40" }}>
                        <table class="table  table-dark">
                            <tbody>
                                {this.state.shoppingCart && this.renderShoppingCart()}
                            </tbody>
                        </table>
                        {this.state.shoppingCart.length == 0 ? null : <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={this.placeOrder}>Place Order</button>}
                    </div>
                </div>
                {this.openModal()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileDetails: state.ProfileReducer.profileDetails,
    }
}

export default connect(mapStateToProps)(DetailPage)

