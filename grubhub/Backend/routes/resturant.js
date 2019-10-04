var express = require('express');
var router = express.Router();
var connection = require('./connection')

//get list of resturants based on dish and zip
router.get('/', function (req, response, next) {
    const { zip, dish } = req.query;
    let query = "select m.id,m.resturant_name,m.cuisine,any_value(im.image_name) as image_name from item as i inner join " +
    "merchant_section as ms on i.section = ms.id inner join merchant " +
    "as m on ms.merchant_id = m.id inner join address as a on m.address_id = a.id "+
    "left outer join image as im on im.merchant_id  = m.id "+
    "where i.name like '" + dish + "%' "
    if(zip){
        query += " and zipcode = ?";
    }
    query += " group by m.id ";
    connection.query(query,[zip] ,function (err, res) {
        if (err) response.json({ error: true, msg: "Operation failed", details: err });
        response.json({ error: false, msg: "Resturants retrived based on dish", data: res });
    })

});

//get list of items offered by a resturant based on resturant id
router.get('/id', function (req, response, next) {
    const { resturantId } = req.query;
    let query = "SELECT  i.id,i.name,i.description,i.section,ms.section_text,i.price,im.id as image_id,im.image_name FROM item AS i INNER JOIN " +
        "merchant_section as ms on i.section = ms.id inner join merchant " +
        "as m on ms.merchant_id = m.id left outer join image as im on im.item_id = i.id" +
        " where m.id = ? order by i.section ";

    connection.query(query, [resturantId], function (err, res) {
        if (err) response.json({ error: true, msg: "Operation failed", details: err });
        
        response.json({ error: false, msg: "Resturants details retrived based on id", data: res });
    })

});

router.get('/resturantimage', function (req, response, next) {
    const { resturantId } = req.query;
    let query = "select * from image where merchant_id = ? limit 1";
    connection.query(query, [resturantId], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return
        }
        
        response.json({ error: false, msg: "Resturants image retrived based on id", data: res });
    })

});

router.get('/cuisine', function (req, response) {
    let query = "select distinct cuisine from merchant";
    connection.query(query, function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return
        }
        response.json({ error: false, msg: "All the cuisines retrived succesfully", data: res });
    })

});


module.exports = router;