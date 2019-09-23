var express = require('express');
var router = express.Router();
var connection = require('./connection')
const bcrypt = require('bcrypt');

//Get buyer profile details
router.get('/', function (req, response, next) {

  let query = "select b.* ,a.street,a.city,a.state,a.zipcode from buyer as b inner join address as a on a.id = b.address_id where b.id	= ? ";
  connection.query(query, [req.session.user.id], function (err, res) {
    if (err) {
      response.json({ error: true, msg: "Operation failed", details: err });
    }
    console.log(res);
    response.json({ error: true, msg: "Operation succesful", details: res });
  });

});

//Login
router.post('/', function (req, response, next) {
  const { email, pwd } = req.body;
  let query = "select id,email_id,password from buyer where email_id = ?";
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
        req.session.user = { id: res[0].id, email: res[0].email_id };
        response.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
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


//Update Profile
router.post('/update', function (req, response, next) {
  const { full_name,mobile_no, street, city, state, email_id, zipcode ,address_id,id} = req.body.profileDetails;
  let query = "UPDATE address SET street = ? , city = ?,state = ?,zipcode = ? where id = ?";
  connection.query(query, [street, city, state, zipcode,address_id], function (err, res) {
    if (err) response.json({ error: true, msg: "Operation failed", details: err });
    console.log("Address updated succesfully", res.insertId);
    let query = "update buyer set full_name = ?, email_id =?, mobile_no = ?, address_id = ? where id = ?";
    connection.query(query, [full_name, email_id,mobile_no,address_id, id], function (err, res) {
      if (err) response.json({ error: true, msg: "Operation failed", details: err });
      console.log("Buyer account updated succesfully", res.insertId);
      response.json({ error: false, msg: "account created succesfully", details: res });
    });
  });

});


router.post('/image', function (req, response, next) {
  console.log(req.body)
});

module.exports = router;
