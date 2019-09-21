var express = require('express');
var router = express.Router();
var connection = require('./connection')

const orderStatusNew = 1;

router.get('/', function (req, res, next) {

});

router.post('/', function (req, response, next) {
    const user_id = req.session.user.id;
    const { resturantId, items } = req.body;
    let query = "INSERT INTO `order` (buyer_id,merchant_id,status) VALUES (?,?,?)";
    //insert in the order with buyer and merchant details
    connection.query(query, [user_id, resturantId, orderStatusNew], function (err, res) {
        if (err) response.json({ error: true, msg: "Operation failed", details: err });
        //prepare items to be inserted into the table
        let order_item = [];
        //ignore last row is total price
        for (let i = 0; i < items.length -1; i++) {
            order_item.push([res.insertId,items[i].itemId,items[i].qty]);
        }
        //insert the order details
        let query = "INSERT INTO order_item (order_id,item,qty) VALUES ?";
        connection.query(query, [order_item], function (err, res) {
            if (err) response.json({ error: true, msg: "Operation failed", details: err });
            response.json({ error: false, msg: "Order placed sucessfully", details: res });
        })
    })

});

module.exports = router;