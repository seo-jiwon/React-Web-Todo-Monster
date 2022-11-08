const express = require("express");
const router = express.Router();
const database = require("../database");

// 일반인 사용자 매칭 조건 설정 
router.post("/todoInput", (req, res) => {
    database.query(
        "INSERT INTO todolist(do_num, do_content, do_date) values (?,?,?)", [req.body.do_num, req.body.do_content, req.body.do_date],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("do input");
        }
    });
});

module.exports = router;