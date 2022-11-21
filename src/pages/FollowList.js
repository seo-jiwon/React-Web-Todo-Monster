import { React,useEffect,useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import ListTab from './ListTab';
import axios from "axios";

function FollowList() {
  const navigate = useNavigate();
  const location = useLocation();
  const follow = location.state;

  const [userId, setUserId] = useState('');


  useEffect(() => {
    axios.get("/isLogged/isLogged").then((res) => {
      var userData = res.data.user[0];
      if (res.status) {
        setUserId(userData.user_id);
      }
    });
  },[userId]);

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
        <div id="pageTitle">팔로우</div>
      </div>
      <ListTab follow={follow}/>
    </div>
  );
}
export default FollowList;
