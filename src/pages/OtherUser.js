import React from 'react';
import "../css/Todo.css";
import "../css/OtherUser.css";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Headerbar from './Headerbar';
import { useNavigate } from "react-router-dom";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Todo() {
    const navigate = useNavigate();
    const todoInput = [
        {
            className1: "todoCheckBox",
            className2: "todoInput",
        },
    ]

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
                <button className='followbtn' onClick={() => { }}>
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
                            <input className='todoCheckBox' type='checkbox' />
                            <input className='todoInput' type='text' />
                        </div>

                        <div>
                            {todoInput.map((item, ind) => {
                                return (
                                    <div key={ind}>
                                        <input className={item.className1} type='checkbox' />
                                        <input className={item.className2} />
                                        {item.component}
                                    </div>
                                )
                            })}
                        </div>
                        <br />


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo;