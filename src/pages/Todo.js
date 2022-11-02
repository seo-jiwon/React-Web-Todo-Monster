import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Todo.css";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

function Todo() {
    const navigate = useNavigate();
    return (<div className="todoContent">
        <div className="header">
            <MenuIcon />
            <SearchIcon />
        </div>

        <br />
        <button onClick={()=> {navigate('/home')}}>Home 버튼</button>
    </div>)
}

export default Todo;