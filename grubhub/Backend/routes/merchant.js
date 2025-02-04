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
        response.json({ error: true, msg: "Operation succesful", details: res });
    });

});

//Update Profile
router.post('/update', function (req, response, next) {
    const { merchant_name, resturant_name, cuisine, mobile_no, street, city, state, email_id, zipcode, address_id, id } = req.body.profileDetails;
    let query = "UPDATE address SET street = ? , city = ?,state = ?,zipcode = ? where id = ?";
    connection.query(query, [street, city, state, zipcode, address_id], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return;
        }
        let query = "update merchant set merchant_name = ?,resturant_name = ?,cuisine= ?, email_id =?, mobile_no = ?, address_id = ? where id = ?";
        connection.query(query, [merchant_name, resturant_name, cuisine, email_id, mobile_no, address_id, id], function (err, res) {
            if (err) {
                response.json({ error: true, msg: "Operation failed", details: err });
                return;
            }
            response.json({ error: false, msg: "account updated succesfully", details: res });
        });
    });

});
//update profile pic of the merchant owner
router.post("/profilePic", function (req, response) {
    let sampleFile = req.files.profileImage;
    let filePath = '/images/profile/' + sampleFile.name;
    sampleFile.mv(__dirname + "/../public" + filePath, function (err) {
        if (err) return response.status(500).send(err);

        let query = "UPDATE merchant SET profile_image = ? where id = ?";
        connection.query(query, [filePath, req.session.user.id], function (err, res) {
            if (err) {
                response.json({ error: true, msg: "Operation failed", details: err });
                return;
            }

            response.json({ error: false, msg: "Image updated succesfully", details: res });
        });
    });
});

//Update resturant images
router.post("/resturantImages", function (req, response) {
    let sampleFiles = req.files.profileImage;
    if (sampleFiles.constructor != Array) sampleFiles = [sampleFiles];
    sampleFiles.forEach(sampleFile => {
        let filePath = '/images/resturant/' + sampleFile.name;
        sampleFile.mv(__dirname + "/../public" + filePath, function (err) {
            if (err) return response.status(500).send(err);

            let query = "insert into image (merchant_id,image_name) values (?,?) ";
            connection.query(query, [req.session.user.id, filePath], function (err, res) {
                if (err) {
                    response.json({ error: true, msg: "Operation failed", details: err });
                    return;
                }
            });
        });
    });
    response.json({ error: false, msg: "Images updated succesfully", details: {} });
});

//fetch resurant images
router.get('/resturantImages', function (req, response, next) {
    let query = "select * from image where merchant_id = ? and item_id is null";
    connection.query(query, [req.session.user.id], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return
        }
        response.json({ error: true, msg: "Operation succesful", details: res });
    });

});


//Login
router.post('/', function (req, response, next) {
    const { email, pwd } = req.body;
    let query = "select id,merchant_name,email_id,password from merchant where email_id = ?";
    connection.query(query, [email], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return;
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

//Sign Up
router.post('/signup', function (req, response, next) {
    const { FullName, Address, City, State, Email, Zip, Password, RName } = req.body.profileDetails;
    let query = "INSERT INTO address (street, city,state,zipcode) VALUES (?,?,?,?)";

    connection.query(query, [Address, City, State, Zip], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return;
        }

        //Hash the password
        bcrypt.hash(Password, 10).then(function (hash) {
            let query = "INSERT INTO merchant (merchant_name,resturant_name,email_id,address_id,password) VALUES (?,?,?,?,?)";
            connection.query(query, [FullName, RName, Email, res.insertId, hash], function (err, res) {
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

router.get('/section', function (req, response) {
    let query = "select * from merchant_section where merchant_id = ?";
    connection.query(query, [req.session.user.id], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return
        }
        response.json({ error: false, msg: "Operation succesful", details: res });
    });

});

router.post('/section', function (req, response, next) {
    const { section } = req.body;
    let query = "INSERT INTO merchant_section (merchant_id,section_text) VALUES (?,?)";
    connection.query(query, [req.session.user.id, section], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return
        }
        response.json({ error: false, msg: "Operation succesful", details: res });
    });

});

router.post('/deleteSection', function (req, response, next) {
    const { section } = req.body;
    let query = "delete from merchant_section where id = ?";
    connection.query(query, [section], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return
        }
        response.json({ error: false, msg: "Operation succesful", details: res });
    });

});

router.get('/items', function (req, response) {
    const { section } = req.query;
    let query = "select i.*,im.image_name from merchant_section as m inner join " +
        "item as i on m.id = i.section left outer join image as im on i.id = im.item_id " +
        "where m.merchant_id = ? and m.id = ?";
    connection.query(query, [req.session.user.id, section], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return
        }
        response.json({ error: false, msg: "Operation succesful", details: res });
    });

});


router.post('/addItem', function (req, response, next) {
    const { item, section, } = req.body;
    let query = "INSERT INTO item (name,description,section,price) VALUES (?,?,?,?)";
    connection.query(query, [item.name, item.description, section, item.price], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return
        }
        response.json({ error: false, msg: "Operation succesful", details: res });
    });

});

router.post('/updateItem', function (req, response, next) {
    const { item, id } = req.body;
    let query = "UPDATE item SET name = ?, description = ?,price = ?" +
        " where id = ?";
    connection.query(query, [item.name, item.description, parseInt(item.price), id], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return
        }
        response.json({ error: false, msg: "Operation succesful", details: res });
    });

});

router.post("/itemImage", function (req, response) {
    let sampleFile = req.files.itemImage;
    let { itemid } = req.body;
    let filePath = '/images/item/' + sampleFile.name;
    sampleFile.mv(__dirname + "/../public" + filePath, function (err) {
        if (err) return response.status(500).send(err);

        let query = "UPDATE image SET image_name = ?, merchant_id = ? WHERE item_id = ?"
        connection.query(query, [filePath, req.session.user.id, itemid], function (err, res) {
            if (err) {
                response.json({ error: true, msg: "Operation failed", details: err });
                return;
            }

            response.json({ error: false, msg: "Image updated succesfully", details: res });
        });
    });
});


router.post('/deleteitem', function (req, response) {
    let { item } = req.body;
    let query = "delete from item where id = ?";
    connection.query(query, [item], function (err, res) {
        if (err) {
            response.json({ error: true, msg: "Operation failed", details: err });
            return;
        }

        response.json({ error: false, msg: "item deleted succesfully", details: res });
    });
});

async function authenticate(pwd, hash) {
    const match = await bcrypt.compare(pwd, hash);
    return match;
}

module.exports = router;
