import React from 'react';
import NavbarResturant from './NavbarResturant';
import { connect } from 'react-redux';
import { fetchOrders } from './actions/LoginActions'


class BuyerOrders extends React.Component {

    componentDidMount = () => {
        this.props.fetchOrders([4, 5]);

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
                <NavbarResturant />
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
        orders: state.OrderReducer.orders
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (flag) => { dispatch(fetchOrders(flag)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerOrders)