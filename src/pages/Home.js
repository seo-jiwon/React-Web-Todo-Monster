import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div id="container">
      <div id="logo">
        <img id="dustImg" src={require("../img/dust_purple.jpg")}></img>
        <div id="titleContainer">
          <p id="title">Todo Monster</p>
          <p id="title_ex">할 일을 계획하고 몬스터를 키워보세요!</p>
        </div>
      </div>

      <div id="btnContainer">
        <button
          id="btn"
          onClick={() => {
            navigate("/signUp");
          }}
        >
          <p id="btnText">회원가입</p>
        </button>
        <button
          id="btn"
          onClick={() => {
            navigate("/signIn");
          }}
        >
          <p id="btnText">로그인</p>
        </button>
      </div>
    </div>
  );
}

export default Home;
