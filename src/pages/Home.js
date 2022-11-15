import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import {motion} from 'framer-motion';

function Home() {
  const navigate = useNavigate();

  return (
    <div id="container">
      <motion.div id="logo"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          default: {
            duration: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
          },
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
      >
        <img id="dustImg" src={require("../img/dust_purple.jpg")}></img>
        <div id="titleContainer">
          <p id="title">Todo Monster</p>
          <p id="title_ex">할 일을 계획하고 몬스터를 키워보세요!</p>
        </div>
      </motion.div>

      <motion.div id="btnContainer"
        initial={{y: 200}}
        animate={{y:  -20}}
        transition={{delay:0.2, type:'spring', stiffness: 100}}  
      >
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
      </motion.div>
    </div>
  );
}

export default Home;
