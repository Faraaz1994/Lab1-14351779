import React from 'react';
import { Redirect } from 'react-router-dom';
import NavbarResturant from './NavbarResturant'
import { connect } from 'react-redux';
import { fetchOrders,changeOrderStatus } from './actions/LoginActions'

class HomePageResturant extends React.Component {

    componentWillMount = () => {
        this.props.fetchOrders([1,2,3]);
    }

    renderOrders = () => {
        let items = [];
        let count = 0;
        let i = 0;
        let intialOrder = this.props.orders[0].id;
        let temp = JSON.parse(JSON.stringify(this.props.orders));

        //Create the header for the table
        items.push(<tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Item Name</th>
            <th>Price X Qty</th>
            <th>Order Status</th>
            <th> Edit</th>
        </tr>);

        //custom row grouping functionality
        for (let index = 0; index < temp.length; index++) {
            if (intialOrder === temp[index].id) {
                count++;
                if (count > 1) {
                    delete temp[index].id;
                    delete temp[index].full_name;
                    delete temp[index].address;
                }
                if (index === temp.length - 1) {
                    temp[i].rowSpan = count;
                }
            }
            else {
                intialOrder = temp[index].id;
                temp[i].rowSpan = count;
                count = 1;
                i = index;
            }

        }
        items.push(...temp.map((item) => {
            return (
                <tr>
                    {item.id && <td rowSpan={item.rowSpan}>{item.id}</td>}
                    {item.full_name && <td rowSpan={item.rowSpan}>{item.full_name}
                        <p>{item.address}</p>
                    </td>}
                    <td>{item.name}</td>
                    <td>{item.price} X {item.qty}</td>
                    <td style={this.getStyle(item.status_text)}>{item.status_text}</td>
                    {item.id && <td rowSpan={item.rowSpan} style={{ textAlign: "center", fontSize: "1.5rem", verticalAlign: "middle" }}>
                        <i class="fa fa-pencil-square" onClick={this.handleEdit} data-orderid={item.id} data-toggle="modal" data-target="#exampleModalCenter" />
                    </td>}
                </tr>
            )
        }));
        return items;
    }
    getStyle =(text) =>{
        if(text === 'cancelled'){
            return {
                color : '#bc5a45'
            }
        }
        else if(text === 'new'){
            return
        }
        else if(text === 'preparing'){
            return{
                color : '#b5e7a0'
            }
        }
        else if(text === 'ready'){
            return{
                color : '#86af49'
            }
        }
        else if(text === 'delivered'){
            return{
                color : '#34A853'
            }
        }

    }
    handleOrderStatusChange = (event) => {
        let select = document.getElementById("orderStatus");
        this.props.changeOrderStatus(this.selectedOrderId,select.options[select.selectedIndex].value);
    }
    openModal = () => {
        return (
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Manage order</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-7">
                                    <p> Change the status of the order : </p>
                                </div>
                                <div className="col-5" >
                                    <div class="dropdown">
                                        <select class="custom-select" id="orderStatus">
                                            <option value="1">New</option>
                                            <option value="2">Preparing</option>
                                            <option value="3">Ready</option>
                                            <option value="4">Delivered</option>
                                            <option value="5">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handleOrderStatusChange}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleEdit = (event) => {
        this.selectedOrderId = event.target.dataset.orderid;
    }
    render() {
        return (
            <div>
                <NavbarResturant />
                <table class="table table-bordered table-dark">
                    <tbody>
                        {this.props.orders && this.renderOrders()}
                    </tbody>
                </table>
                {this.openModal()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.OrderReducer.orders
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (flag) => { dispatch(fetchOrders(flag)) },
        changeOrderStatus : (orderid,status) =>{ dispatch(changeOrderStatus(orderid,status))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageResturant)