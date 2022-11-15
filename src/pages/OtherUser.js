import React, { useEffect,useState } from 'react';
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
    //유저정보
    const authUser = userId.userId.authUser.authUser;
    //검색된 유저
    const location = useLocation();
    const otherUser = location.state.otherUser;

    const navigate = useNavigate();

    const [isFollow,setIsFollow] = useState(false);
    const [isUser, setIsUser] = useState(false);

    useEffect(()=> {
        const followData = {
            authUser : authUser,
            otherUser : otherUser
        }
        console.log("auth : ", authUser);
        axios.post("/follow/isfollow", followData).then((res) => {
            if(res.data[0].count != 0) {
                setIsFollow(true);
            } else {
                setIsFollow(false);
            }
        });
    },[authUser]);

    function follow(authUser,otherUser) {
        const data = {
            authUser : authUser,
            otherUser : otherUser
        }

        axios.post("/follow/follow", data)
            .then(function(res) {
                setIsFollow(true);
            }).catch(function (err) {
                console.log("팔로우 실패", err);
            });
    }


    function unfollow(authUser,otherUser) {
        const data = {
            authUser : authUser,
            otherUser : otherUser
        }

        axios.post("/follow/unfollow", data)
            .then(function(res) {
                setIsFollow(false);
            }).catch(function (err) {
                console.log("언팔로우 실패", err);
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
                {isFollow ? <button className='followbtn' onClick={()=>unfollow(authUser,otherUser)}>
                    언팔로우
                </button> : <button className='followbtn' onClick={()=>follow(authUser,otherUser)}>
                    팔로우
                </button>}
                
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
                </div>
            </div>
        </div>
    )
}

export default OtherUser;