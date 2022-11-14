import React from 'react';
import "../css/Todo.css";
import "../css/OtherUser.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function OtherUser(userId) {
    
    const navigate = useNavigate();
    const location = useLocation();

    //유저정보
    const authUser = userId.userId.authUser;
    //검색된 유저
    const otherUser = location.state.otherUser;

    function follow(authUser,otherUser) {
        const data = {
            authUser : authUser,
            otherUser : otherUser
        }

        axios.post("/follow/following", data)
            .then(function(res) {
                console.log(res);
            }).catch(function (err) {
                console.log("팔로우 실패", err);
            });
    }

    return (
        <div id="container">
            <div id="AppBar">
                <button
                    id="backBtn"
                    onClick={() => {
                        navigate("/search");
                    }}
                >
                    {"<"}
                </button>
                <button className='followbtn' onClick={()=>follow(authUser,otherUser)}>
                    팔로우
                </button>
            </div>


            <div className="todoContent">
                <div className="leftContentDiv">
                    <div className='profileDiv'>
                        <div className='profileImgDiv'>
                            <img className='profileImgSize' src={require('../img/profile3.jpeg')} />
                        </div>
                        <span>user2</span>
                    </div>
                </div>

                <div className='chaDiv'></div>

                <div className='middleContentDiv2'>
                    <div className='calendarDiv'>
                        <Calendar />
                    </div>
                    <br />
                    <div>
                        <button className='todoAddBtn' onClick={() => { }}>
                            카테고리명
                        </button>

                        <div>
                        </div>

                        <div>
                            
                        </div>
                        <br />


                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtherUser;