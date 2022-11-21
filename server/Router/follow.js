const express = require("express");
const router = express.Router();
const database = require("../database");
const jwt = require("jsonwebtoken");

router.post("/follow", (req, res) => {
    if(!req.cookies.authUser) {
        return res.send({success:0,message: '다시 로그인 해주세요'})
    }
    const user = jwt.verify(req.cookies.authUser, process.env.JWT_SECRET,(err,token) => {
        if(err) return null;
        else return token;
    })
    if(user == null) return res.send({ success:0 })
    database.query(
        "INSERT INTO follow(follower_id,following_id) values(?,?) ", [req.body.otherUser,req.body.userId] ,
        (err, result) => {
            if (err) throw err;
            //등록완료되면 success 1 반환
            return res.send({ success: 1 }), console.log("팔로우 성공");
          }
    );
});

router.post("/unfollow", (req, res) => {
    if(!req.cookies.authUser) {
        return res.send({success:0,message: '다시 로그인 해주세요'})
    }
    const user = jwt.verify(req.cookies.authUser, process.env.JWT_SECRET,(err,token) => {
        if(err) return null;
        else return token;
    })
    if(user == null) return res.send({ success:0 });
    database.query(
        "DELETE FROM FOLLOW WHERE follower_id = ? and following_id = ?", [req.body.otherUser,req.body.userId] ,
        (err, result) => {
            if (err) throw err;
            //등록완료되면 success 1 반환
            return res.send({ success: 1 }), console.log("언팔로우 성공");
          }
    );
});

router.post("/isfollow", (req,res) => {
    console.log("auth : ",req.body.userId);
    console.log("other : ",req.body.otherUser);
    database.query(
        "SELECT count(*) count from follow where follower_id = ? and following_id = ? ", [req.body.otherUser,req.body.userId] ,
        (err, result) => {
            if (err) throw err;
            //등록완료되면 success 1 반환
            return res.send(result), console.log(result);
          }
    );
});

router.post("/followCount", (req,res) => {
    const data=[req.body.userId]
    const follower = 'SELECT count(*) follower from follow where follower_id = ?;';
    const following = 'SELECT count(*) following from follow where following_id = ?;';
    const followerQuery = database.format(follower,data);
    const followingQuery = database.format(following,data);
    database.query(followingQuery + followerQuery,
        (err,result) => {
            const followingList = result[0];
            const followerList = result[1];
            if(err) throw err;
            return res.send({followerList,followingList});
        }); 
});

router.post("/followingList", (req,res) => {
    database.query(
        "select user_id,email from user inner join (select follower_id from follow where following_id=?) f on user.user_id=f.follower_id", [req.body.userId] ,
        (err, result) => {
            if (err) throw err;
            //등록완료되면 success 1 반환
            return res.send(result), console.log("result : ", result);
          }
    );
});

router.post("/followerList", (req,res) => {
    database.query(
        "select user_id,email from user inner join (select following_id from follow where follower_id= ?) f on user.user_id=f.following_id ", [req.body.userId] ,
        (err, result) => {
            if (err) throw err;
            //등록완료되면 success 1 반환
            return res.send(result), console.log("result : ", result);
          }
    );
});

module.exports = router;