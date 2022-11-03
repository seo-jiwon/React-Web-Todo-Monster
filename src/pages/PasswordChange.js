import { React } from "react";
import { useNavigate } from "react-router-dom";
import "../css/common.css";

function PasswordChange() {
  const navigate = useNavigate();

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
        <div id="pageTitle">비밀번호 변경</div>
      </div>

      <div id="inputForm">
        <input id="value" placeholder="기존 비밀번호"></input>
        <div id="line"></div>
      </div>

      <div id="inputForm">
        <input id="value" placeholder="새로운 비밀번호"></input>
        <div id="line"></div>
      </div>

      <div id="inputForm">
        <input id="value" placeholder="새로운 비밀번호 확인"></input>
        <div id="line"></div>
      </div>

      <button
        id="checkBtn"
        onClick={() => {
          navigate("/home");
        }}
      >
        확인
      </button>
    </div>
  );
}

export default PasswordChange;
