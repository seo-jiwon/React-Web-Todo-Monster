const express = require("express");
const router = express.Router();
const database = require("../database");
const jwt = require("jsonwebtoken");

// todo 입력
router.post("/todoInput", (req, res) => {
    if(!req.cookies.authUser) {
        return res.send({success:0,message: '다시 로그인 해주세요'})
    }
    const user = jwt.verify(req.cookies.authUser, process.env.JWT_SECRET,(err,token) => {
        if(err) return null;
        else return token;
    })
    if(user == null) return res.send({ success:0 })
    database.query(
        "INSERT INTO todolist(do_content, user_id, do_date, do_isDone) values (?,?,?,?)", [req.body.do_content, req.body.user_id, req.body.do_date, req.body.do_isDone],
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
    if(!req.cookies.authUser) {
        return res.send({success:0,message: '다시 로그인 해주세요'})
    }
    const user = jwt.verify(req.cookies.authUser, process.env.JWT_SECRET,(err,token) => {
        if(err) return null;
        else return token;
    })
    if(user == null) return res.send({ success:0 })
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

// todo 체크 0: check x, 1: check o
router.post("/todoCheck", (req, res) => {
    if(!req.cookies.authUser) {
        return res.send({success:0,message: '다시 로그인 해주세요'})
    }
    const user = jwt.verify(req.cookies.authUser, process.env.JWT_SECRET,(err,token) => {
        if(err) return null;
        else return token;
    })
    if(user == null) return res.send({ success:0 })
    database.query(
        "UPDATE todolist SET do_isDone=? WHERE do_id=?", [req.body.do_isDone, req.body.do_id],
    function(err, data){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("do check");
        }
    });
});

// todo 상세1 사용 x
router.get('/todos', (req,res) => {
    database.query('SELECT * FROM todolist where do_id=?', [req.query.do_id], (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("할 일 전체 가져오기");
        }
    })
})

// todo 상세2 사용!!
router.get('/todolist', (req,res) => {
    if(!req.cookies.authUser) {
        return res.send({success:0,message: '다시 로그인 해주세요'})
    }
    const user = jwt.verify(req.cookies.authUser, process.env.JWT_SECRET,(err,token) => {
        if(err) return null;
        else return token;
    })
    if(user == null) return res.send({ success:0 })

    //user 검증 후 유저의 id값을 검색해서 id 반환
    database.query('SELECT user_id, name FROM user WHERE user_id =?', [user.id], (err,result) => {
        if(err) throw err
        console.log("result : ", result)
        // return res.send({success:1, user: result})

        database.query('SELECT * FROM todolist WHERE user_id=?', [user.id], (err, result) => {
            if(err) res.send(err);
            else{
                res.send(result);
            }
        })
    })

})

// todo 삭제
router.post("/todoDelete", (req, res) => {
    if(!req.cookies.authUser) {
        return res.send({success:0,message: '다시 로그인 해주세요'})
    }
    const user = jwt.verify(req.cookies.authUser, process.env.JWT_SECRET,(err,token) => {
        if(err) return null;
        else return token;
    })
    if(user == null) return res.send({ success:0 })
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