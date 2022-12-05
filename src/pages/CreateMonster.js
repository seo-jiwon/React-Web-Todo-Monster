import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Profile.css";

function Profile() {
  const navigate = useNavigate();

  //입력 값
  const [monName, setMonName] = useState("");
  //유저 아이디
  const [userId, setUserId] = useState("");

  //입력 칸 공백 검사
  const [isName, setIsName] = useState(false);

  //입력 칸 공백 검사
  const checkName = (e) => {
    const nameCurrent = e.target.value;
    setMonName(nameCurrent);

    if (nameCurrent.length > 0) {
      setIsName(true);
    } else {
      setIsName(false);
    }
  };

  //유저 로그인 정보
  useEffect(() => {
    axios.get("/isLogged/isLogged").then((res) => {
      var userData = res.data.user[0];
      if (res.status) {
        setUserId(userData.user_id);
        // setMonName(userData.name);
      }
    });
  }, []);

  //서버 전송
  const ProfileForm = useCallback((e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      userId: e.target.userId.value,
    };

    axios
      .post("/monster/create", data)
      .then(function (response) {
        if (response.data.success) {
          navigate("/");
        }
      })
      .catch(function (error) {
        alert("프로필 에러: " + error);
      });
  }, []);

  return (
    <div id="container">
      <form onSubmit={ProfileForm}>
        <input name="userId" value={userId} type="hidden"/>
        <div id="AppBar">
          <button
            id="backBtn"
            onClick={() => {
              navigate("/");
            }}
          >
            {"<"}
          </button>
          <div id="pageTitle">몬스터 생성</div>
          <button id="p_checkBtn" type="submit" disabled={!isName}>
            확인
          </button>
        </div>

        <div id="profileImgContainer">
          <img id="profileImg" src={require("../img/dust_pink.jpg")}></img>
        
        </div>

        <div id="p_inputForm">
          <p id="p_label">이름</p>
          <input
            id="p_value"
            name="name"
            placeholder="이름 입력"
            value={monName}
            onChange={checkName}
          ></input>
          <div id="p_line"></div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
