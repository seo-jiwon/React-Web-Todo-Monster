import { React } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Category.css";

function Category_Add() {
  const navigate = useNavigate();

  return (
    <div id="container">
      <div id="AppBar">
        <button
          id="backBtn"
          onClick={() => {
            navigate("/category");
          }}
        >
          {"<"}
        </button>
        <div id="pageTitle">카테고리 추가</div>
        <button
          id="c_checkBtn"
          onClick={() => {
            navigate("/category");
          }}
        >
          확인
        </button>
      </div>

      <div id="categoryForm">
        <input
          id="category_add"
          placeholder="카테고리명 입력"
        ></input>
        <div id="category_line"></div>
      </div>

      <div id="privacyForm">
        <p id="privacy">공개설정</p>
        <button
          id="privacy_edit"
          onClick={() => {
            navigate("/category_add");
          }}
        >
          나만보기 ▼
        </button>
        <div id="line"></div>
      </div>
    </div>
  );
}

export default Category_Add;
