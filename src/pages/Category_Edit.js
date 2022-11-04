import { React } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Category.css";

function Category_Edit() {
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
        <div id="pageTitle">카테고리 수정</div>
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
            navigate("/category_edit");
          }}
        >
          나만보기 ▼
        </button>
        <div id="c_line"></div>
      </div>

      <button
        id="delBtn"
        onClick={() => {alert("이 카테고리를 삭제하시겠습니까?")}}>
        삭제
      </button>
    </div>
  );
}

export default Category_Edit;
