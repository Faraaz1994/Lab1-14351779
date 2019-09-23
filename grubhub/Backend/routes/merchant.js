var express = require('express');
var router = express.Router();
var connection = require('./connection')
const bcrypt = require('bcrypt');


//Get merchant profile details
router.get('/', function (req, response, next) {

    let query = "select m.* ,a.street,a.city,a.state,a.zipcode from merchant as m inner join address as a on a.id = m.address_id where m.id	= ? ";
    connection.query(query, [req.session.user.id], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
        }
        console.log(res);
        response.json({ error: true, msg: "Operation succesful", details: res });
    });

});

//Update Profile
router.post('/update', function (req, response, next) {
    const { merchant_name, resturant_name, cuisine, mobile_no, street, city, state, email_id, zipcode, address_id, id } = req.body.profileDetails;
    let query = "UPDATE address SET street = ? , city = ?,state = ?,zipcode = ? where id = ?";
    connection.query(query, [street, city, state, zipcode, address_id], function (err, res) {
        if (err) response.json({ error: true, msg: "Operation failed", details: err });
        let query = "update merchant set merchant_name = ?,resturant_name = ?,cuisine= ?, email_id =?, mobile_no = ?, address_id = ? where id = ?";
        connection.query(query, [merchant_name, resturant_name, cuisine, email_id, mobile_no, address_id, id], function (err, res) {
            if (err) response.json({ error: true, msg: "Operation failed", details: err });
            response.json({ error: false, msg: "account updated succesfully", details: res });
        });
    });

});

//Login
router.post('/', function (req, response, next) {
    const { email, pwd } = req.body;
    let query = "select id,email_id,password from merchant where email_id = ?";
    connection.query(query, [email], function (err, res) {
        if (err) response.json({ error: true, msg: "Operation failed", details: err });

        if (res.length < 1) {
            response.json({ error: true, msg: "Invalid Email ID", details: err });
            return
        }

        authenticate(pwd, res[0].password).then((match) => {
            if (match) {
                req.session.user = { id: res[0].id, email: res[0].email_id };
                response.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
                response.json({ error: false, msg: "Succesfully logged in", details: res });
            }
            else {
                response.json({ error: true, msg: "Invalid credentials", details: res });
            }
        })

    })

});


//Sign Up
router.post('/signup', function (req, response, next) {
    const { FullName, Address, City, State, Email, Zip, Password, RName } = req.body;
    let query = "INSERT INTO address (street, city,state,zipcode) VALUES (?,?,?,?)";

    connection.query(query, [Address, City, State, Zip], function (err, res) {
        if (err) response.json({ error: true, msg: "Operation failed", details: err });

        console.log("Address added succesfully", res.insertId);
        //Hash the password
        bcrypt.hash(Password, 10).then(function (hash) {
            console.log("Hash generated", hash)
            let query = "INSERT INTO merchant (merchant_name,resturant_name,email_id,address_id,password) VALUES (?,?,?,?,?)";
            connection.query(query, [FullName, RName, Email, res.insertId, hash], function (err, res) {
                if (err) response.json({ error: true, msg: "Operation failed", details: err });

                console.log("Merchant account created succesfully", res.insertId);
                response.json({ error: false, msg: "account created succesfully", details: res });
            });

        });
    });

});

async function authenticate(pwd, hash) {
    const match = await bcrypt.compare(pwd, hash);
    console.log("Match", match);
    return match;
}

module.exports = router;
