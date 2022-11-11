import { React, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  //서버 전송
  const SignInForm = useCallback((e) => {
    setEmail("");
    setPassword("");
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);

    axios
      .post("/user/signin", data)
      .then(function (response) {
        if (response.data.success) {
          navigate("/");
        }
        else {
          alert("로그인 정보를 다시 확인해주세요😥");
        }
      })
      .catch(function (error) {
        alert("로그인 에러: " + error);
      });
  }, []);

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

      <form onSubmit={SignInForm}>
        <div id="inputForm">
          <input
            id="value"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={checkEmail}
          ></input>
          <div id="line" />
        </div>

        <div id="inputForm">
          <input
            id="value"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={checkPwd}
          ></input>
          <div id="line" />
        </div>

        <button id="checkBtn" type="submit" disabled={!(isEmail && isPassword)}>
          확인
        </button>
      </form>
    </div>
  );
}

export default SignIn;
