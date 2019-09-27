var express = require('express');
var router = express.Router();
var connection = require('./connection')

//Order Status 
//'1','new'
//'2','preparing'
//'3','ready'
//'4','Delivered'
// '5','Cancelled'
const orderStatusNew = 1;

router.get('/', function (req, response) {
    let query = "select o.*,oi.qty,i.name,i.section,i.price,os.status_text,b.full_name," +
        "concat_ws(' ',a.street,a.city,a.state) as address " +
        "from `order` as o inner join order_item as oi " +
        "on o.id = oi.order_id inner join item as i " +
        "on oi.item = i.id inner join order_status as os " +
        "on o.status = os.id inner join buyer as b " +
        "on o.buyer_id = b.id inner join address as a " +
        "on b.address_id = a.id where o.merchant_id = ? order by o.id"
    connection.query(query, [req.session.user.id], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return;
        }
        response.json({ error: false, msg: "Operation Succeded", details: res });

    });
});

router.post('/', function (req, response, next) {
    const user_id = req.session.user.id;
    const { resturantId, items } = req.body;
    let query = "INSERT INTO `order` (buyer_id,merchant_id,status) VALUES (?,?,?)";
    //insert in the order with buyer and merchant details
    connection.query(query, [user_id, resturantId, orderStatusNew], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return;
        }
        //prepare items to be inserted into the table
        let order_item = [];
        //ignore last row is total price
        for (let i = 0; i < items.length - 1; i++) {
            order_item.push([res.insertId, items[i].itemId, items[i].qty]);
        }
        //insert the order details
        let query = "INSERT INTO order_item (order_id,item,qty) VALUES ?";
        connection.query(query, [order_item], function (err, res) {
            if (err) {
                response.json({ error: true, msg: "Operation failed", details: err });
                return;
            }
            response.json({ error: false, msg: "Order placed sucessfully", details: res });
        })
    })

});


router.post('/changeStatus', function (req, response, next) {
    const user_id = req.session.user.id;
    const { orderId, status } = req.body;
    let query = "update `order` set status = ? where id = ?";
    //update order
    connection.query(query, [status, orderId], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return;
        }
        response.json({ error: false, msg: "Order status changed sucessfully", details: res });
    })

});



module.exports = router;