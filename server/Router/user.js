const express = require("express");
const router = express.Router();
const database = require("../database");

router.get('/todo', (req,res) => {
    database.query('SELECT user_id, email, password FROM user;', (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("test");
        }
    })
})

module.exports = router;