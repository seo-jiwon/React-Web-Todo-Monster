const express = require("express");
const router = express.Router();
const database = require("../database");
const jwt = require("jsonwebtoken");

//카테고리 추가
router.post("/categoryAdd", (req, res) => {
  const { userId, categoryName, privacy } = req.body;
  var privacyNum = 0;
  if(privacy == "나만보기"){
    privacyNum = 3;
  }else if(privacy == "일부공개"){
    privacyNum = 2;
  }else if(privacy =="전체공개"){
    privacyNum = 1;
  }
  database.query(
    "INSERT INTO category(user_id, cate_name, cate_privacy) values (?, ?, ?)",
    [userId, categoryName, privacyNum],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ success: 1 });
      }
    }
  );
});

//카테고리 조회
router.get("/category", (req, res) => {
  database.query(
    "SELECT cate_id, user_id, cate_name, cate_privacy FROM category",
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ success: 1, result: result});
      }
    }
  );
});

//카테고리 수정
router.post("/categoryEdit", (req, res) => {
  const { cateId, categoryName, privacy } = req.body;
  var privacyNum = 0;
  if(privacy == "나만보기"){
    privacyNum = 3;
  }else if(privacy == "일부공개"){
    privacyNum = 2;
  }else if(privacy =="전체공개"){
    privacyNum = 1;
  }
  database.query(
    "UPDATE category SET cate_name=?, cate_privacy=? WHERE cate_id=?", [categoryName, privacyNum, cateId],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ success: 1 });
      }
    }
  );
});

//카테고리 삭제
router.post("/categoryDelete", (req, res) => {
  const { cateId } = req.body;
  database.query(
    "DELETE FROM category WHERE cate_id = ?", [cateId],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ success: 1 });
      }
    }
  );
});

module.exports = router;
