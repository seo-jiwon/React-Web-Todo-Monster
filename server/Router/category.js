const express = require("express");
const router = express.Router();
const database = require("../database");
const jwt = require("jsonwebtoken");

//카테고리 추가
router.post("/categoryAdd", (req, res) => {
  const { userId, categoryName, privacy } = req.body;
  database.query(
    "INSERT INTO category(user_id, cate_name, cate_privacy) values (?, ?, ?)",
    [userId, categoryName, privacy],
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

module.exports = router;
