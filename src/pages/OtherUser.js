import React, { useEffect,useState } from 'react';
import "../css/Todo.css";
import "../css/OtherUser.css";
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import OtherTodoList from './OtherTodoList';

// 캘린더 디자인
const CalendarContainer = styled.div`
  /* 전체 */
  .react-calendar {
    margin: auto;
    background-color: #FAF3FF;
    padding: 3%;
    border-radius: 3px;
    border: 2px solid #F6E9FF;
  }

  /* 년 월 헤더바 */
  .react-calendar__navigation {
    display: flex;
    .react-calendar__navigation__label {
      font-weight: bold;
    }
    .react-calendar__navigation__arrow {
      flex-grow: 0.3;
    }
  }
  
  /* 요일 라벨 */
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    margin-top: -5%;
  }

  /* 날짜 버튼 */
  button {
    margin: 3px;
    background-color: white;
    border: 0;
    border-radius: 3px;
    color: black;
    padding: 5px 0;
  }

  /* 클릭 시 유지되는 색상 */
  button:enabled:hover {
    background-color: #A92DFF;
    color: white;
  }

  /* 클릭 시 잠시 보이는 색상 */
  button:enabled:active {
    background-color: white;
    color: black;
  }

  /* 년, 월 헤더바 */
  .react-calendar__navigation button {
    min-width: 44px;
    background: white;
  }

  /* 년, 월 헤더바 */
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: white;
    color: black;
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    background: #FFA8DC;
    color: white;
  }

  /* 다른 날짜 클릭 후 다시 오늘 날짜 클릭 한 경우 */
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #FFA8DC;
  }
  
  /* 날짜 grid */
  .react-calendar__month-view__days {
    /* !important : 나중에 설정한 속성 값이 적용되지 않게 함 */
    display: grid !important;

    /* 각 요일별 크기에 맞게 사이즈 조절 */
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%; 
    
    /* 클릭된 버튼 그림자 */
    .react-calendar__tile--range {
      box-shadow: 1px 1px 5px 0px #878787;
    }
  }
  
  /* 해당 달 외 다른 달 */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.5;
  }

  /* 주말 글씨 색상 */
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
  }

`;

function OtherUser() {
    let clickDate;

    const [calendarValue, setCalendarValue] = useState(new Date()); // 캘린더 날짜
    const [followData, setFollowData] = useState([]);
    const [cateName, setCateName] = useState([]); // 카테고리 저장
    const [user, setUser] = useState([]);
    const [isFollow,setIsFollow] = useState(false);
    let isFollowList = false;

    clickDate = moment(calendarValue).format("YYYY-MM-DD"); // 캘린더 클릭한 날짜 한국 시간대
    //검색된 유저
    const location = useLocation();
    const userId = location.state.userId;
    const otherUser = location.state.otherUser;
    const userImg = location.state.profileImg;
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

        const user = {
          otherUser : otherUser
        }
        axios.post("/follow/User", user).then((res) => {
          setUser(res.data[0]);
        })
    },[userId]);

    useEffect(() => {
        const data = {
            otherUser : otherUser
        }
        axios.post("/follow/followData", data).then((res) => {
            setFollowData(res.data);
          });
        },[userId,clickDate]);
    
      useEffect(() => {
        const cateName = followData.map(function (val, index) {
          return val['cate_name'];
      }).filter(function (val, index, arr) {
          return arr.indexOf(val) === index;
      });
      setCateName(cateName);

      },[followData])

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
                        <img className='profileImgSize' src={require('../img/profile1.jpeg')} />
                        </div>
                        <span>{user.name}</span>
                    </div>
                </div>
                <div className='chaDiv'></div>
                <div className='calendarDiv'>
                    <CalendarContainer>
                        <Calendar onChange={setCalendarValue} value={calendarValue} />
                    </CalendarContainer>
                </div>
                <br/>
                <OtherTodoList
                  followData={followData}
                  cateName={cateName}
                  clickDate={clickDate}
                  isFollow={isFollow}/>
            </div>
        </div>
    )
}

export default OtherUser;