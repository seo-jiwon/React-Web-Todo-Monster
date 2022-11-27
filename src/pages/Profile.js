import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HiCamera } from "react-icons/hi";
import "../css/Profile.css";
import jquery from 'jquery';
import $ from 'jquery';

function Profile() {
  const navigate = useNavigate();

  const M = window.M;
  window.$ = window.jquery = jquery;

  
  //입력 값
  const [name, setName] = useState("");
  //유저 아이디
  const [userId, setUserId] = useState("");

  const [userImg, setUserImg] = useState('');
  //입력 칸 공백 검사
  const [isName, setIsName] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  //입력 칸 공백 검사
  const checkName = (e) => {
    const nameCurrent = e.target.value;
    setName(nameCurrent);

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
        setName(userData.name);
        setUserImg(userData.profile_img);
      }
    });
  }, []);

  //서버 전송
  const ProfileForm = useCallback((e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      userId: e.target.userId.value,
      img: e.target.img.value
    };

    axios
      .post("/user/profile", data)
      .then(function (response) {
        if (response.data.success) {
          navigate("/");
        }
      })
      .catch(function (error) {
        alert("프로필 에러: " + error);
      });
  }, []);

  function camera() {
    var API_SERVER_URL = "http://localhost:5000";
      M.media.picker({
        mode:"SINGLE",
        media:"PHOTO",
        column:3,
        callback:function (status, result) {
          if (status === "SUCCESS") {
            var filePath = result.path;
            M.net.http.upload({
              url: API_SERVER_URL + "/file/upload",
              header: {},
              params: {},
              body: [{ name: "file", content: filePath, type: "FILE" }],
              encoding: "UTF-8",
              finish: function (status, header, body, setting) {
                if (status == 200) {
                  var resBody = JSON.parse(body);
                  var imgSrc = API_SERVER_URL + resBody.path;
                  $("img").attr("src", imgSrc);
                  setProfileImg(imgSrc);
                }}
            })}}
        })
  }

  return (
    <div id="container">
      <form onSubmit={ProfileForm}>
        <input name="userId" value={userId} type="hidden"/>
        <input name="img" value={profileImg} type="hidden" />
        <div id="AppBar">
          <button
            id="backBtn"
            onClick={() => {
              navigate("/");
            }}
          >
            {"<"}
          </button>
          <div id="pageTitle">프로필</div>
          <button id="p_checkBtn" type="submit" disabled={!isName}>
            확인
          </button>
        </div>

        <div id="profileImgContainer">
          {userImg === null ? <img id="profileImg" src={require('../img/profile1.jpeg')}/> : userImg === '' ? <img id="profileImg" src={require('../img/profile1.jpeg')}/> : <img id="profileImg" src={userImg}/>}
          <HiCamera id="cameraIcon" onClick={camera}/>
        </div>

        <div id="p_inputForm">
          <p id="p_label">이름</p>
          <input
            id="p_value"
            name="name"
            placeholder="이름 입력"
            value={name}
            onChange={checkName}
          ></input>
          <div id="p_line"></div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
