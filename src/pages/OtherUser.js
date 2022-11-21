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

function OtherUser() {

    const [isFollow,setIsFollow] = useState(false);
    let isFollowList = false;

    //검색된 유저
    const location = useLocation();
    const userId = location.state.userId;
    const otherUser = location.state.otherUser;
    isFollowList = location.state.isFollowList;

    const navigate = useNavigate();

    useEffect(()=> {


        const followData = {
            userId : userId,
            otherUser : otherUser
        }

        axios.post("/follow/isfollow", followData).then((res) => {
            if(res.data[0].count != 0) {
                setIsFollow(true);
            } else {
                setIsFollow(false);
            }
        });
    },[userId]);

    function follow(userId,otherUser) {
        const data = {
            userId : userId,
            otherUser : otherUser
        }

        axios.post("/follow/follow", data)
            .then(function(res) {
                setIsFollow(true);
            }).catch(function (err) {
                console.log("팔로우 실패", err);
            });
    }


    function unfollow(userId,otherUser) {
        const data = {
            userId : userId,
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
                        {isFollowList===true ? navigate("/") : navigate("/search") }
                        
                    }}
                >
                    {"<"}
                </button>

                {userId===otherUser ? <span></span> : 
                    <span>{isFollow ? <button className='followbtn' onClick={()=>unfollow(userId,otherUser)}>
                    언팔로우
                    </button> : <button className='followbtn' onClick={()=>follow(userId,otherUser)}>
                    팔로우
                    </button>}</span>
                }
                
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