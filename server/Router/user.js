const express = require("express");
const router = express.Router();
const database = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//회원가입 및 최초 카테고리 생성
router.post("/signup", async (req, res) => {
  const { email, password: pass } = req.body;
  database.query(
    //이메일 검사
    "SELECT email FROM user WHERE email = ?",
    [email],
    async (stop, userchk) => {
      if (stop) throw stop;
      // 체크해서 0번지에 값이 있으면 success 0 반환
      if (userchk[0])
        return res.send({ success: 0 });
      //패스워드 암호화
      const password = await bcrypt.hash(pass, 10);
      //등록
      database.query(
        "INSERT INTO user SET ?",
        { email, password },
        (err, result) => {
          if (err) throw err;
          //등록완료되면 success 1 반환
          console.log("SignUp Success !");

          //방금 회원가입 한 유저 아이디 가져오기
          database.query('select user_id from user ORDER BY user_id DESC LIMIT 1', (err,result) => {
            if(err) throw err
            console.log("회원가입 한 사용자 아이디 result : ", result)

            // 최초 카테고리 생성
            database.query(
              "INSERT INTO category(user_id, cate_name, cate_privacy) values (?, ?, ?)",
              [result[0].user_id, '일반', '1'],
              function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  res.send({ success: 1 }); console.log("카테고리 최초 생성 성공 !");
                }
              }
            );
        })
        }
      );
    }
  );
});

//로그인
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  database.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    async (stop, userchk) => {
      if (stop) throw stop;
      if (!userchk[0] || !(await bcrypt.compare(password, userchk[0].password)))
        return res.send({ success: 0 });

      const token = jwt.sign(
        {
          id: userchk[0].user_id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES,
        }
      );
      const cookieOption = {
        expiresIn: new Date(
          Date.now() * process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      res.cookie("authUser", token, cookieOption);
      return res.send({ success: 1 }), console.log("Login Success !");
    }
  );
});

//프로필
router.post("/profile", (req, res) => {
  const { name, userId } = req.body;
  database.query(
    "UPDATE user SET name = ? WHERE user_id = ?",
    [name, userId],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ success: 1, username: result });
        console.log("Update Username Success !");
      }
    }
  );
});

//로그아웃
router.get("/logout", (req, res) => {
  res.clearCookie("authUser");
  res.send({ success: 1 });
});

//비밀번호 변경
router.post("/passwordchange", async (req, res) => {
  var { userId, password, newPassword, newPassword:pass } = req.body;

  //기존 비밀번호가 일치하는지 확인
  database.query(
    "SELECT * FROM user WHERE user_id = ?", [userId],
    async (stop, pwdChk) => {
      if (stop) throw stop;

      //기존 비밀번호 불일치 시
      else if (!(await bcrypt.compare(password, pwdChk[0].password))) {
        return res.send({ failure: 1 }), console.log("PasswordChange Error : 기존 비밀번호 불일치");
      }

      //기존 비밀번호 일치할 시
      else {
        //패스워드 암호화
        database.query(
          "SELECT * FROM user WHERE user_id = ?", [userId],
          async (stop, newPwdChk) => {
            if (stop) throw stop;
            //새로운 비밀번호가 기존 비밀번호와 동일, user 테이블에 일치 행 있음
            else if ((await bcrypt.compare(newPassword, newPwdChk[0].password))) {
              return (
                res.send({ failure: 2 }),
                console.log("PasswordChange Error : 새로운 비밀번호와 기존 비밀번호가 동일")
              );
            } else {
              const newPassword = await bcrypt.hash(pass, 10);
              //비밀번호 수정
              database.query(
                "UPDATE user SET password = ? WHERE user_id = ?",
                [newPassword, userId],
                (err, result) => {
                  if (err) {
                    return console.log(err);
                  } else {
                    return (
                      res.send({ success: 1 }),
                      console.log("PasswordChange Success !")
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

//계정 삭제
router.post("/deleteUser", (req, res) => {
  const { userId } = req.body;
  database.query(
    "DELETE FROM user WHERE user_id = ?", [userId],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie("authUser");
        res.send({ success: 1 });
        console.log("Delete User Account Success !");
      }
    }
  );
});

router.post("/otherUser", (req,res) => {
  console.log(req.body);
  database.query(
    "SELECT user_id from user where email=?",[req.body.data],
    (err,result) => {
      if(err) throw err;
      return res.send(result); 
    }
  )
})

module.exports = router;
