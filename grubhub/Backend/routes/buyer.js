var express = require('express');
var router = express.Router();
var connection = require('./connection')
const bcrypt = require('bcrypt');


router.get('/', function (req, res, next) {
  console.log(req, "get buyer")
});

//Login
router.post('/', function (req, response, next) {
  const { email, pwd } = req.body;
  console.log(email, pwd);
  let query = "select email_id,password from buyer where email_id = ?";
  connection.query(query, [email], function (err, res) {
    if (err) {
      response.json({ error: true, msg: "Operation failed", details: err });
    }

    if (res.length < 1) {
      response.json({ error: true, msg: "Invalid Email ID", details: err });
      return
    }

    authenticate(pwd, res[0].password).then((match) => {
      if (match) {
        console.log("authenticated");
        response.json({ error: false, msg: "Succesfully logged in", details: res });
      }
      else {
        console.log("authentication failed");
        response.json({ error: true, msg: "Invalid credentials", details: res });
      }
    })

  })

});




//Sign Up
router.post('/signup', function (req, response, next) {
  const { FullName, Address, City, State, Email, Zip, Password } = req.body;
  let query = "INSERT INTO address (street, city,state,zipcode) VALUES (?,?,?,?)";

  connection.query(query, [Address, City, State, Zip], function (err, res) {
    if (err) response.json({ error: true, msg: "Operation failed", details: err });

    console.log("Address added succesfully", res.insertId);
    //Hash the password
    bcrypt.hash(Password, 10).then(function (hash) {
      console.log("Hash generated", hash)
      let query = "INSERT INTO buyer (full_name,email_id,address_id,password) VALUES (?,?,?,?)";
      connection.query(query, [FullName, Email, res.insertId, hash], function (err, res) {
        if (err) response.json({ error: true, msg: "Operation failed", details: err });

        console.log("Buyer account created succesfully", res.insertId);
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
