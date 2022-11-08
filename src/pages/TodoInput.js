import React, { useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/TodoInput.css';

function TodoInput({onInsert}) {

    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const do_num = useRef(1);
    const date = new Date();
    let time = {
        year: date.getFullYear(),  //현재 년도
        month: date.getMonth() + 1, // 현재 월
        date: date.getDate(), // 현제 날짜
        hours: date.getHours(), //현재 시간
        minutes: date.getMinutes(), //현재 분
      };
    let timestring = `${time.year}-${time.month}-${time.date} ${time.hours}:${time.minutes}`;

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, [])

    const onSubmit = useCallback(e => {
        onInsert(value);
        setValue(''); // input의 value 값 초기화
        e.preventDefault(); // 새로고침 방지

        const data = {
            do_num: do_num.current,
            do_content: e.target.do_content.value,
            do_date: timestring,
        }
        do_num.current++;

        axios.post("http://localhost:5000/todolist/todoInput", data)
            .then(function (response) {
                console.log(response);
                if (response.data.success) {
                    navigate('/');
                }
            }).catch(function (error) {
                alert("할 일 입력 실패!" + error);
            });
    },[onInsert, value])

    return (
        <form onSubmit={onSubmit}>
            <input className='todoInput' onChange={onChange} value={value} name="do_content"/>
            <button className='todoAddBtn' type="submit">ADD</button>
        </form>
    )
}

export default TodoInput;