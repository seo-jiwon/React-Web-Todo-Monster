import React from "react";
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import "../css/Headerbar.css";

function Sidebar() {
  const navigate = useNavigate();

  return (<div className='headerContent'>
    <SearchIcon className="searchIcon" onClick={()=> {navigate("/search")}} />
    <input id="check-btn" type="checkbox" />
    <label id="check-label" htmlFor="check-btn">
      <MenuIcon  />
    </label>
    <div className="sidebar">

      <div id='profileDiv' onClick={() => {navigate("/profile")}}>
        <div className='profileImgDiv'>
          <img className='profileImgSize' src={require('../img/profile1.jpeg')} />
        </div>
        <div id='sidebarName'>zion</div>
        <div id='sidebarEmail'>zion@cu.ac.kr</div>
      </div>

      <div className='sidebarFollowDiv' onClick={() => {navigate("/")}}>
        <span>101 팔로워 </span>
        <span>111 팔로잉 </span>
      </div>
      <hr />

      <div className='sidebarProfileDiv' onClick={() => {navigate("/profile")}}>
        <p>프로필</p>
      </div>
      <hr />

      <div className='sidebarCategoryDiv' onClick={() => {navigate("/category")}}>
        <p>카테고리</p>
        <div>
          <span>일반</span>
        </div>
      </div>
      <hr />

      <div className='sidebarPasswordDiv' onClick={() => {navigate("/passwordChange")}}>
        <p>비밀번호 재설정</p>
      </div>

      <div className='sidebarLogoutDiv' onClick={() => {navigate("/")}}>
        <p>로그아웃</p>
      </div>

      <div className='sidebarDeleteDiv' onClick={() => {alert("계정을 삭제하시겠습니까?")}}>
        <p>계정 삭제하기</p>
      </div>

    </div>
  </div>
  );
};


export default Sidebar;