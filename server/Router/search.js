const express = require("express");
const router = express.Router();
const database = require("../database");

router.get('/search', (req,res) => {
    database.query('select u.user_id, u.email from user u left join (select t.user_id, t.do_content from todolist t right JOIN category c on c.user_id = t.user_id where c.cate_privacy = "전체공개") todo on u.user_id = todo.user_id',
    (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("result : ", result);
        }
    });
});

router.get('/todos', (req,res) => {
    database.query('select u.user_id, todo.do_content from user u left join (select t.user_id, t.do_content from todolist t right JOIN category c on c.user_id = t.user_id where c.cate_privacy = "전체공개") todo on u.user_id = todo.user_id',
    (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("result : ", result);
        }
    });
});

module.exports = router;