import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/common.css";

function SignIn() {
  const navigate = useNavigate();

  //입력 값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //입력 칸 공백 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  //이메일 공백 검사
  const checkEmail = (e) => {
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (emailCurrent.length > 0) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  };

  //비밀번호 공백 검사
  const checkPwd = (e) => {
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (passwordCurrent.length > 0) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  };

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
        <div id="pageTitle">로그인</div>
      </div>

      <div id="inputForm">
        <input
          id="value"
          placeholder="이메일"
          value={email}
          onChange={checkEmail}
        ></input>
        <div id="line"></div>
      </div>
      <div id="inputForm">
        <input
          id="value"
          placeholder="비밀번호"
          value={password}
          onChange={checkPwd}
        ></input>
        <div id="line"></div>
      </div>

      <button
        id="checkBtn"
        disabled={!(isEmail && isPassword)}
        onClick={() => {
          navigate("/");
        }}
      >
        확인
      </button>
    </div>
  );
}

export default SignIn;
