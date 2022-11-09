const express = require("express");
const router = express.Router();
const database = require("../database");

router.get('/search', (req,res) => {
    database.query('select u.name, todo.do_content from user u left join (select t.user_id, t.do_content from todolist t right JOIN category c on c.user_id = t.user_id where c.cate_privacy = "1") todo on u.user_id = todo.user_id',
    (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("result : ", result);
        }
    });
});

module.exports = router;