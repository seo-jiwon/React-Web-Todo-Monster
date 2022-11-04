import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
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

      <form>
        <div id="inputForm">
          <input
            id="value"
            placeholder="이메일"
            value={email}
            onChange={checkEmail}
          ></input>
          <div id="line"></div>
          {email.length > 0 && <p id="message">{emailError}</p>}
        </div>

        <div id="inputForm">
          <input
            id="value"
            placeholder="비밀번호"
            value={password}
            onChange={checkPwd}
          ></input>
          <div id="line"></div>
          {password.length > 0 && <p id="message">{passwordError}</p>}
        </div>
      </form>

      <button
        id="checkBtn"
        disabled={!(isEmail && isPassword)}
        onClick={() => {
          alert("회원가입이 완료되었어요!🥳")
          navigate("/home");
        }}
      >
        확인
      </button>
    </div>
  );
}

export default SignUp;
