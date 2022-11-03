import { React } from "react";
import { useNavigate } from "react-router-dom";
import "../css/common.css";

function SignUp() {
  const navigate = useNavigate();

  return (
    <div id="container">
      <div id="AppBar">
        <button
          id="backBtn"
          onClick={() => {
            navigate("/home");
          }}
        >
          {"<"}
        </button>
        <div id="pageTitle">회원가입</div>
      </div>

      <div id="inputForm">
        <input id="value" placeholder="이메일"></input>
        <div id="line"></div>
      </div>
      <div id="inputForm">

        <input id="value" placeholder="비밀번호"></input>
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

export default SignUp;
