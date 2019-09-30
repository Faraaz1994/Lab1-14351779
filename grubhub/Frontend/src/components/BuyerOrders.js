import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { fetchBuyerOrders } from './actions/LoginActions'


class BuyerOrders extends React.Component {

    componentDidMount = () => {
        //all the orders(upcoming orders) that have status "1","2","3" 
        let flag = [];
        this.props.location.state.flag == 0 ? flag = [1, 2, 3] : flag = [4, 5]
        this.props.fetchBuyerOrders(flag);

    }
    componentDidUpdate = (prevProps) => {
        let flag = [];
        this.props.location.state.flag == 0 ? flag = [1, 2, 3] : flag = [4, 5];
        if (this.props.location.search != prevProps.location.search) {
            this.props.fetchBuyerOrders(flag);
        }
    }

    renderOrders = () => {
        if (this.props.orders.length == 0) {
            return (
                <tr style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: "4rem",fontFamily:"fantasy"}}>
                    <td >
                        You dont have any recent orders 
                </td>
                </tr>
            )
        }
        let items = [];
        let count = 0;
        let i = 0;
        let intialOrder = this.props.orders[0].id;
        let temp = JSON.parse(JSON.stringify(this.props.orders));

        //Create the header for the table
        items.push(<tr>
            <th>Order ID</th>
            <th>Resturant Name</th>
            <th>Item Name</th>
            <th>Price X Qty</th>
            <th>Order Status</th>
        </tr>);

        //custom row grouping functionality
        for (let index = 0; index < temp.length; index++) {
            if (intialOrder === temp[index].id) {
                count++;
                if (count > 1) {
                    delete temp[index].id;
                    delete temp[index].resturant_name;
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
        console.log(temp, "temp");
        items.push(...temp.map((item) => {
            return (
                <tr>
                    {item.id && <td rowSpan={item.rowSpan}>{item.id}</td>}
                    {item.resturant_name && <td rowSpan={item.rowSpan}>{item.resturant_name}
                        <p>{item.address}</p>
                    </td>}
                    <td>{item.name}</td>
                    <td>{item.price} X {item.qty}</td>
                    <td style={this.getStyle(item.status_text)}>{item.status_text}</td>
                </tr>
            )
        }));
        return items;
    }
    getStyle = (text) => {
        if (text === 'cancelled') {
            return {
                color: '#bc5a45'
            }
        }
        else if (text === 'new') {
            return
        }
        else if (text === 'preparing') {
            return {
                color: '#b5e7a0'
            }
        }
        else if (text === 'ready') {
            return {
                color: '#86af49'
            }
        }
        else if (text === 'delivered') {
            return {
                color: '#34A853'
            }
        }

    }
    render = () => {
        return (
            <div>
                <Navbar />
                <table class="table table-bordered table-dark">
                    <tbody>
                        {this.props.orders && this.renderOrders()}
                    </tbody>
                </table>
            </div>
        )


    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.OrderReducer.orders,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchBuyerOrders: (flag) => { dispatch(fetchBuyerOrders(flag)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerOrders)