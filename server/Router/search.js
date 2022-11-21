const express = require("express");
const router = express.Router();
const database = require("../database");

router.get('/search', (req,res) => {
    database.query('select u.user_id,u.email, t.do_content from user u left join (select t.do_id,t.cate_id,t.user_id,t.do_content,t.do_isDone,t.do_date from todolist t left join category c on t.cate_id = c.cate_id where c.cate_privacy="전체공개") t on u.user_id=t.user_id order by t.do_id desc',
    (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("result : ", result);
        }
    });
});

router.get('/todos', (req,res) => {
    database.query('SELECT * FROM (SELECT *, RANK() OVER (PARTITION BY todo.user_id order by todo.do_id desc) AS a FROM (select u.email, t.do_id,t.cate_id,t.user_id,t.do_content,t.do_isDone,t.do_date from user u left join (select t.do_id,t.cate_id,t.user_id,t.do_content,t.do_isDone,t.do_date from todolist t left join category c on t.cate_id = c.cate_id where c.cate_privacy="전체공개") t on t.user_id=u.user_id) as todo) AS rankrow WHERE rankrow.a <=5',
    (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("result : ", result);
        }
    });
});

module.exports = router;