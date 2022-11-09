const express = require("express");
const router = express.Router();
const database = require("../database");

// todo 입력
router.post("/todoInput", (req, res) => {
    database.query(
        "INSERT INTO todolist(do_content, do_date) values (?,?)", [req.body.do_content, req.body.do_date],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("do input");
        }
    });
});

// todo 수정
router.post("/todoUpdate", (req, res) => {
    database.query(
        "UPDATE todolist SET do_content=?, do_updateDate=? WHERE do_id=?", [req.body.do_content, req.body.do_updateDate, req.body.do_id],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("do update");
        }
    });
});

// todo 상세
router.get('/todos', (req,res) => {
    database.query('SELECT * FROM todolist where do_id=?', [req.query.do_id], (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("할 일 전체 가져오기");
        }
    })
})

router.get('/todolist', (req,res) => {
    database.query('SELECT do_id, do_content FROM todolist', (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("할 일 목록 조회");
        }
    })
})

// todo 삭제
router.post("/todoDelete", (req, res) => {
    database.query(
        "DELETE FROM todolist where do_id=?", [req.body.do_id],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("할 일 삭제");
        }
    });
});

module.exports = router;