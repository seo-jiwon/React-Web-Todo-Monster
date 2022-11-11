const express = require("express");
const router = express.Router();
const database = require("../database");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


//회원가입
router.post("/signup", async (req, res) => {
    const {email,password: pass} = req.body
    database.query(
        //이메일 검사
        'SELECT email FROM user WHERE email = ?',[email], async (stop,userchk) => {
            if(stop) throw stop
            // 체크해서 0번지에 값이 있으면 success 0 반환
            if(userchk[0]) return res.send({success:0,message:'이미 존재하는 이메일입니다.'})
            //패스워드 암호화
            const password = await bcrypt.hash(pass,10)
            //등록
            database.query('INSERT INTO user SET ?', {email,password}, (err,result) => {
                console.log('email : ',email)
                console.log('password : ',password)
                if(err) throw err
                //등록완료되면 success 1 반환
                return res.send({success:1, message:'회원가입 완료'})
            })
        }
    )
})

//로그인
router.post("/signin", (req, res) => {
    const {email,password} = req.body
    database.query(
        "SELECT email, password FROM user WHERE email = ?", [email], async (stop,userchk) =>{
            if(stop) throw stop
            if(!userchk[0] || !await bcrypt.compare(password, userchk[0].password)) 
            return res.send({success:0,message:'등록되지 않은 사용자입니다.'})
            const token = jwt.sign({id: userchk.id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            })
            const cookieOption = {
                expiresIn: new Date(Date.now() * process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true 
            }
            
            res.cookie('authUser', token, cookieOption)
            console.log('token : ', token)
            console.log('cookie : ', cookieOption)
            console.log('req.cookie : ',req.cookies.authUser)
            return res.send({success:1, message:'로그인 성공'})
        })
    
});

//로그아웃
/**
 * res.clearCookie('AuthUser')
 */

module.exports = router;