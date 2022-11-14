import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Category.css";

function Category() {
  const navigate = useNavigate();
  //유저 아이디
  const [userId, setUserId] = useState("");
  //카테고리 조회
  const [categoryAll, setCategoryAll] = useState([]);

  //유저 로그인 정보
  useEffect(() => {
    axios.get("/isLogged/isLogged").then((res) => {
      var userData = res.data.user[0];
      if (res.status) {
        setUserId(userData.user_id);
      }
    });

    //카테고리 조회
    axios.get("/category/category").then((response) => {
      setCategoryAll(response.data.result);
    });
  }, []);

  return (
    <div id="container">
      <div id="AppBar">
        <button
          id="backBtn"
          onClick={() => {
            navigate("/");
          }}
        >
          {"<"}
        </button>
        <div id="pageTitle">카테고리</div>
        <button
          id="addBtn"
          onClick={() => {
            navigate("/category_add");
          }}
        >
          {"+"}
        </button>
      </div>

      {categoryAll.map((category, key) => {
        //카테고리 아이디, 이름, 공개설정
        var cateId = category.cate_id;
        var cateName = category.cate_name;
        var catePrivacy = category.cate_privacy;

        //회원 아이디 같은 것만
        if (category.user_id == userId){
          return (
            <div id="categoryForm" key={key}>
              <button
                id="category"
                name="categoryName"
                type="button"
                onClick={() => {
                  navigate("/category_edit", {
                  state: {
                    cate_id: {cateId},
                    cate_name: {cateName},
                    cate_privacy: {catePrivacy},
                  }
                  });
                }}
              >
                {cateName}
              </button>
              <button
                id="category_edit"
                onClick={() => {
                  navigate("/category_edit", {
                  state: {
                    cate_id: {cateId},
                    cate_name: {cateName},
                    cate_privacy: {catePrivacy},
                  }
                  });
                }}
              >
                {">"}
              </button>
              <div id="c_line"></div>
            </div>
          );
              }
      })}
    </div>
  );
}

export default Category;
