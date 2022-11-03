import { React } from "react";
import { useNavigate } from "react-router-dom";
import { HiCamera } from "react-icons/hi";
import "../css/Profile.css";

function Profile() {
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
        <div id="pageTitle">프로필</div>
        <button
          id="barCheckBtn"
          onClick={() => {
            navigate("/");
          }}
        >
          확인
        </button>
      </div>

      <div id="profileImgContainer">
        <img id="profileImg" src={require("../img/dust_pink.jpg")}></img>
        <HiCamera id="cameraIcon" />
      </div>

      <div id="p_inputForm">
        <p id="p_label">이름</p>
        <input id="p_value" placeholder="이름 입력"></input>
        <div id="p_line"></div>
      </div>
    </div>
  );
}

export default Profile;
