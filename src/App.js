import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "./routes";

function App() {

  const [authUser, setauthUser] = useState(""); // 유저 아이디

  useEffect(() => {
    axios.get("/isLogged/isLogged").then((res) => {
      var userData = res.data.user[0];
      if (res.status) {
        setauthUser(userData.user_id);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router authUser={authUser}/>
    </div>
  );
}

export default App;
