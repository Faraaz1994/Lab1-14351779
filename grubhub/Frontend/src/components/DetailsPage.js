import React from 'react';
import Navbar from './Navbar';
import img1 from './images/img1.jpg'
const axios = require('axios');


class DetailPage extends React.Component {
    state = {
        sectionDetails: null,
        activeSection: null,
        latestItemId: null,
        latestItemName: null,
        shoppingCart: []
    }

    constructor(props) {
        super(props);
        const { resturantId } = this.props.location.state;
        this.fetchResturantDetails(resturantId);
    }

    componentDidMount() {
        window.$('#exampleModalCenter').on('show.bs.modal', function (event) {
            debugger
            const price = window.$(event.relatedTarget)[0].dataset.price;
            window.$(this).find(".price").text("$ " + price);
        });
        window.$("#btnOrder").on("click", function (event) {
            let items = this.state.shoppingCart;
            let itemName = this.state.latestItemName;
            let itemId = this.state.latestitemid;
            items.push({
                price: window.$.find(".price")[0].innerText.substring(2),
                qty: window.$.find("#inpQty")[0].value,
                itemName : itemName,
                itemId : itemId
            })
            this.setState({
                shoppingCart: items
            })
            window.$.find("#inpQty")[0].value = 1;
        }.bind(this));
    }
    beforeModelOpen = (event) => {
        this.setState({
            latestItemId: event.target.dataset.latestitemid,
            latestItemName: event.target.dataset.latestitemname
        })
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

    renderResturantDetails = () => {
        const { resturant_name, cuisine } = this.props.location.state;
        return (
            <div class="card">
                <img class="card-img-top" src={img1} alt="" style={{ height: "16rem" }} />
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

    //TODO
    getImage = (itemId) => {

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
                    <img class="card-img-top" alt="Card image cap" />
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
    deleteItem = (event) =>{
        console.log("delete",event.target.dataset.index);
        let items = this.state.shoppingCart;
        items.splice(event.target.dataset.index,1);
        this.setState({
            shoppingCart : items
        })
    }

    renderShoppingCart = () => {
        var that = this;
        return this.state.shoppingCart.map((item, index) => {
            const { itemName,qty, price } = item;
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <th>{itemName}</th>
                    <th>{qty} </th>
                    <th>{price}</th>
                    <span onClick={that.deleteItem}>
                    <i class="fa fa-trash" aria-hidden="true" data-index={index}></i>
                    </span>
                </tr>
            )
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
                    <div class="clm-s" style={{ backgroundColor: "#bbb" }}>
                        <table class="table table-sm table-dark">
                            <tbody>
                                {this.renderShoppingCart()}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.openModal()}
            </div>
        )
    }
}

export default DetailPage

