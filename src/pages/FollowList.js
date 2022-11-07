import { React } from "react";
import { useNavigate } from "react-router-dom";

function FollowList() {
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
        <div id="pageTitle">팔로우</div>
        <button
          id="addBtn"
          onClick={() => {
            navigate("/search");
          }}
        >
          {"+"}
        </button>
      </div>

    </div>
  );
}
export default FollowList;
