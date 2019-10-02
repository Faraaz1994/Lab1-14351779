var express = require('express');
var router = express.Router();
var connection = require('./connection')
const bcrypt = require('bcrypt');
var path = require('path');

//Get buyer profile details
router.get('/', function (req, response, next) {
  let query = "select b.* ,a.street,a.city,a.state,a.zipcode from buyer as b inner join address as a on a.id = b.address_id where b.id	= ? ";
  connection.query(query, [req.session.user.id], function (err, res) {
    if (err) {
      response.json({ error: true, msg: "Operation failed", details: err });
    }
    else {
      response.json({ error: true, msg: "Operation succesful", details: res });
    }

  });

});

//Login
router.post('/', function (req, response, next) {
  const { email, pwd } = req.body;
  let query = "select id,full_name,email_id,password from buyer where email_id = ?";
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

//TODO : check email before sign up
//Sign Up
router.post('/signup', function (req, response, next) {
  const { FullName, Address, City, State, Email, Zip, Password } = req.body.profileDetails;
  let query = "INSERT INTO address (street, city,state,zipcode) VALUES (?,?,?,?)";

  connection.query(query, [Address, City, State, Zip], function (err, res) {
    if (err) {
      response.json({ error: true, msg: "Operation failed", details: err });
      return;
    }

    //Hash the password
    bcrypt.hash(Password, 10).then(function (hash) {
      let query = "INSERT INTO buyer (full_name,email_id,address_id,password) VALUES (?,?,?,?)";
      connection.query(query, [FullName, Email, res.insertId, hash], function (err, res) {
        if (err) {
          response.json({ error: true, msg: "Operation failed", details: err });
          return;
        }

        req.session.user = { id: res.insertId, email: Email };
        response.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
        response.json({ error: false, msg: "account created succesfully", details: res });
      });

    });
  });

});

async function authenticate(pwd, hash) {
  const match = await bcrypt.compare(pwd, hash);
  return match;
}


//Update Profile
router.post('/update', function (req, response, next) {
  const { full_name, mobile_no, street, city, state, email_id, zipcode, address_id, id } = req.body.profileDetails;
  let query = "UPDATE address SET street = ? , city = ?,state = ?,zipcode = ? where id = ?";
  connection.query(query, [street, city, state, zipcode, address_id], function (err, res) {
    if (err) {
      response.json({ error: true, msg: "Operation failed", details: err });
      return;
    }
    let query = "update buyer set full_name = ?, email_id =?, mobile_no = ?, address_id = ? where id = ?";
    connection.query(query, [full_name, email_id, mobile_no, address_id, id], function (err, res) {
      if (err) {
        response.json({ error: true, msg: "Operation failed", details: err });
        return;
      }
      response.json({ error: false, msg: "account created succesfully", details: res });
    });
  });

});

//store profile pics
router.post("/profilePic", function (req, response) {
  let sampleFile = req.files.profileImage;
  let filePath = '/images/profile/' + sampleFile.name;
  sampleFile.mv(__dirname + "/../public" + filePath, function (err) {
    if (err) return response.status(500).send(err);

    let query = "UPDATE buyer SET profile_image = ? where id = ?";
    connection.query(query, [filePath, req.session.user.id], function (err, res) {
      if (err) {
        response.json({ error: true, msg: "Operation failed", details: err });
        return;
      }

      response.json({ error: false, msg: "Image updated succesfully", details: res });
    });
  });
});





router.post('/image', function (req, response, next) {
  
});

module.exports = router;
