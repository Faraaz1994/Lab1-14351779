var express = require('express');
var router = express.Router();
var connection = require('./connection')

//get list of resturants based on dish and zip
router.get('/', function (req, response, next) {
    const { zip, dish } = req.query;
    let query = "SELECT DISTINCT m.id,m.resturant_name,m.cuisine FROM item AS i INNER JOIN " +
        "merchant_item AS mi ON i.id = mi.item_id INNER JOIN " +
        "merchant AS m ON m.id = mi.merchant_id where i.name like '" + dish + "%'"
    connection.query(query, function (err, res) {
        if (err) response.json({ error: true, msg: "Operation failed", details: err });
        console.log(res);
        response.json({ error: false, msg: "Resturants retrived based on dish", data: res });
    })

});


router.get('/id', function (req, response, next) {
    const { resturantId } = req.query;
    let query = "SELECT  i.name,i.description,i.section,i.price FROM item AS i INNER JOIN " +
    "merchant_item AS mi ON i.id = mi.item_id WHERE mi.merchant_id = ? order by i.section";
    connection.query(query, [resturantId], function (err, res) {
        if (err) response.json({ error: true, msg: "Operation failed", details: err });
        console.log(res);
        response.json({ error: false, msg: "Resturants details retrived based on id", data: res });
    })

});

module.exports = router;