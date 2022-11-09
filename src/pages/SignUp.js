import { React, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/common.css";

function SignUp() {
  const navigate = useNavigate();

  //입력 값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //에러 메시지
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  //이메일 유효성 검사
  const checkEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailError("이메일 형식이 틀렸어요😥");
      setIsEmail(false);
    } else {
      setEmailError("올바른 이메일 형식이에요😊");
      setIsEmail(true);
    }
  };

  //비밀번호 유효성 검사
  const checkPwd = (e) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordError("영문+숫자 혼합 6자리 이상 입력해주세요😥");
      setIsPassword(false);
    } else {
      setPasswordError("올바른 비밀번호 형식이에요😊");
      setIsPassword(true);
    }
  };

  //서버 전송
  const SignUpForm = useCallback((e) => {
    setEmail("");
    setPassword("");
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);

    axios
      .post("http://localhost:5000/user/signup", data)
      .then(function (response) {
        if (response.data.success) {
          alert("회원가입이 완료되었어요!🥳");
          navigate("/home");
        }
      })
      .catch(function (error) {
        alert("회원가입 에러: " + error);
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
        <div id="pageTitle">회원가입</div>
      </div>

      <form onSubmit={SignUpForm}>
        <div id="inputForm">
          <input
            id="value"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={checkEmail}
          ></input>
          <div id="line" />
          {email.length > 0 && <p id="message">{emailError}</p>}
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
          {password.length > 0 && <p id="message">{passwordError}</p>}
        </div>

        <button id="checkBtn" type="submit" disabled={!(isEmail && isPassword)}>
          확인
        </button>
      </form>
    </div>
  );
}

export default SignUp;
