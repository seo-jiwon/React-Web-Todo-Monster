import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/common.css";

function PasswordChange() {
  const navigate = useNavigate();

  //유저 아이디
  const [userId, setUserId] = useState("");

  //입력 값
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  //에러 메시지
  const [newPasswordError, setnewPasswordError] = useState("");
  const [newPasswordConfirmError, setnewPasswordConfirmError] = useState("");

  //유효성 검사
  const [isPassword, setIsPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isNewPasswordConfirm, setIsNewPasswordConfirm] = useState(false);

  //기존 비밀번호 공백 검사
  const checkPwd = (e) => {
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (passwordCurrent.length > 0) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  };

  //새로운 비밀번호 유효성 검사
  const checkNewPwd = (e) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/;
    const newPasswordCurrent = e.target.value;
    setNewPassword(newPasswordCurrent);

    if (!passwordRegex.test(newPasswordCurrent)) {
      setnewPasswordError("영문+숫자 혼합 6자리 이상 입력해주세요😥");
      setIsNewPassword(false);
    } else {
      setnewPasswordError("올바른 비밀번호 형식이에요😊");
      setIsNewPassword(true);
    }
  };

  //새로운 비밀번호 확인
  const checkNewPwdConfirm = (e) => {
    const newPasswordConfirmCurrent = e.target.value;
    setNewPasswordConfirm(newPasswordConfirmCurrent);

    if (newPassword === newPasswordConfirmCurrent) {
      setnewPasswordConfirmError("비밀번호가 동일해요😊");
      setIsNewPasswordConfirm(true);
    } else {
      setnewPasswordConfirmError("비밀번호를 동일하게 입력해주세요😥");
      setIsNewPasswordConfirm(false);
    }
  };

  //유저 로그인 정보
  useEffect(() => {
    axios.get("/isLogged/isLogged").then((res) => {
      var userData = res.data.user[0];
      if (res.status) {
        setUserId(userData.user_id);
      }
    });
  }, []);

  //서버 전송
  const PasswordChangeForm = useCallback((e) => {
    e.preventDefault();

    const data = {
      userId: e.target.userId.value,
      password: e.target.password.value,
      newPassword: e.target.newPassword.value,
    };
    console.log(data);

    axios
      .post("/user/passwordchange", data)
      .then(function (response) {
        if (response.data.success) {
          navigate("/");
        }
        else if (response.data.failure == 1) {
          alert("기존 비밀번호가 일치하지 않아요😥")
        }
        else if(response.data.failure == 2) {
          alert("새로운 비밀번호가 기존 비밀번호와 동일해요😥")
        }
      })
      .catch(function (error) {
        alert("비밀번호 변경 에러: " + error);
      });
  }, []);

  return (
    <div id="container">
      <form onSubmit={PasswordChangeForm}>
        <input name="userId" value={userId} type="hidden" />
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
          <input
            id="value"
            name="password"
            placeholder="기존 비밀번호"
            value={password}
            onChange={checkPwd}
            type="password"
          ></input>
          <div id="line"></div>
        </div>

        <div id="inputForm">
          <input
            id="value"
            name="newPassword"
            placeholder="새로운 비밀번호"
            value={newPassword}
            onChange={checkNewPwd}
            type="password"
          ></input>
          <div id="line"></div>
          {newPassword.length > 0 && <p id="message">{newPasswordError}</p>}
        </div>

        <div id="inputForm">
          <input
            id="value"
            name="newPasswordConfirm"
            placeholder="새로운 비밀번호 확인"
            value={newPasswordConfirm}
            onChange={checkNewPwdConfirm}
            type="password"
          ></input>
          <div id="line"></div>
          {newPasswordConfirm.length > 0 && (
            <p id="message">{newPasswordConfirmError}</p>
          )}
        </div>

        <button
          id="checkBtn"
          type="submit"
          disabled={!(isPassword && isNewPassword && isNewPasswordConfirm)}
        >
          확인
        </button>
      </form>
    </div>
  );
}

export default PasswordChange;
