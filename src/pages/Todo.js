import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/Todo.css";
import Headerbar from './Headerbar';
import TodoEdit from './TodoEdit';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import moment from 'moment';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';


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

// 캘린더 클릭한 날짜
let clickDate;
let user_id;
let user_name;

function Todo() {

  const [calendarValue, setCalendarValue] = useState(new Date()); // 캘린더 날짜
  const [isAdd, setIsAdd] = useState(false); // 할 일 추가 버튼 visible 여부
  const [userId, setUserId] = useState(""); // 유저 아이디
  const [userName, setUserName] = useState(""); // 유저 아이디
  const navigate = useNavigate();
  clickDate = moment(calendarValue).format("YYYY-MM-DD"); // 캘린더 클릭한 날짜 한국 시간대


  //유저 로그인 정보
  useEffect(() => {
    axios.get("/isLogged/isLogged").then((res) => {
      var userData = res.data.user[0];
      if (res.status) {
        setUserId(userData.user_id);
        setUserName(userData.name);
      }
    });
  }, []);

  user_id=userId;
  user_name=userName;
  // console.log(userId); 2번

  // 카테고리 클릭 시 입력 컴포넌트 open, close
  let clickCnt = 0;
  const handleDoAdd = useCallback((text) => {
    clickCnt++;
    if (clickCnt % 2 == 0) {
      setIsAdd(false);
    }
    else {
      setIsAdd(true);
    }
  }, []);

  // function calendarValueClick() {
  //   alert('클릭');
  //   const data = {
  //     user_id: user_id,
  //     date_view: clickDate
  //   }
  //   axios.post("/todolist/dateView", data)
  //     .then(function (response) {
  //       console.log(response);
  //       if (response.data.success) {
  //         console.log('날짜 클릭 성공!');
  //         navigate('/');
  //       }
  //     }).catch(function (error) {
  //       alert("날짜 클릭 실패!" + error);
  //     });
  // }

  // 할 일 목록 불러오기
  const todolistData = useFetch('/todolist/todolist');
  function useFetch(url) {
    const [data, setData] = useState([]);
    async function fetchUrl() {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    }

    useEffect(() => {
      // setInterval(()=> {fetchUrl()}, 10);
      fetchUrl();
    }, []);
    return data;
  }

  // 할 일 저장할 배열
  const [todos, setTodos] = useState([]);

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);

  // 아이디 1부터
  const nextId = useRef(1);

  // useCallback : 특정 함수를 새로 만들지 않고 재사용
  // 수정 토글 메뉴
  const onInsertToggle = useCallback(() => {
    if (selectedTodo) {
      setSelectedTodo((selectedTodo) => null);
    }
    setInsertToggle((prev) => !prev);
  }, [selectedTodo]);

  // 할 일 수정
  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo((selectedTodo) => todo);
  };

  // 할 일 입력 시 호출되는 함수
  const onInsert = useCallback((text) => {
    const todo = {
      do_id: nextId.current,
      do_content: text,
      do_isDone: false,
    };
    setTodos((todos) => todos.concat(todo)); // concat(): 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열 반환
    nextId.current++; // nextId 1씩 더하기

    const data = {
      do_content: todo.do_content,
      user_id: user_id,
      do_date: clickDate,
      do_isDone: todo.do_isDone,
    }
    axios.post("/todolist/todoInput", data)
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          console.log('할 일 입력 성공!');
          navigate('/');
        }
      }).catch(function (error) {
        alert("할 일 입력 실패!" + error);
      });
  }, []);

  // 할 일 삭제 시 호출되는 함수
  const onRemove = useCallback((id) => {
    // filter() : 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
    setTodos((todos) => todos.filter((todo) => todo.do_id !== id));

    const data = {
      do_id: id
    }

    axios.post("/todolist/todoDelete", data)
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          console.log("할 일 삭제 성공!");
        }
      }).catch(function (error) {
        alert("할 일 삭제 실패!" + error);
      });
  }, []);

  // 할 일 전체 삭제 시 호출되는 함수
  const onRemoveAll = useCallback((id) => {

  }, []);

  // 할 일 수정 시 호출되는 함수
  const onUpdate = useCallback(
    (id, text) => {
      onInsertToggle();

      setTodos((todos) =>
        todos.map((todo) => (todo.do_id === id ? { ...todo, text } : todo)),
      );

      const data = {
        do_id: id,
        do_content: text,
        do_updateDate: clickDate,
      }
      axios.post("/todolist/todoUpdate", data)
        .then(function (response) {
          console.log(response);

          if (response.data.success) {
            console.log('할 일 수정 성공!');
            navigate('/');
          }
        }).catch(function (error) {
          alert("할 일 수정 실패!" + error);
        });
    },
    [onInsertToggle],
  );

  // 할 일 checkBox
  const onToggle = useCallback((id, checked) => {

    setTodos((todos) =>
      todos.map((todo) =>
        todo.do_id == id ? { ...todo, checked: !todo.do_isDone } : todo,
      ),
    );

    const data = {
      do_id: id,
      do_isDone: !checked,
    }
    axios.post("/todolist/todoCheck", data)
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          console.log('할 일 체크 성공!');
          navigate('/');
        }
      }).catch(function (error) {
        alert("할 일 체크 실패!" + error);
      });
  }, []);

  return (<div className="todoContent">
    <div className="header">
      <Headerbar user_id={user_id}/>
    </div>

    <div className="leftContentDiv">
      <div className="followListDiv">
        <div className="followListBtnDiv">
          <img className='followListImgSize' src={require('../img/profile1.jpeg')} onClick={() => { alert('클릭') }} />
          {/* <button className='followListBtn' onClick={() => { alert('클릭') }}></button> */}
          <p>{user_name}</p>
        </div>
        <div className="followListBtnDiv">
          <img className='followListImgSize' src={require('../img/profile2.jpeg')} />
          <p>user1</p>
        </div>
        <div className="followListBtnDiv">
          <img className='followListImgSize' src={require('../img/profile3.jpeg')} />
          <p>user2</p>
        </div>
        <div className="followListBtnDiv">
          <button className='followListDetailBtn' onClick={() => { alert('클릭') }}>
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className='profileDiv'>
        <div className='profileImgDiv'>
          <img className='profileImgSize' src={require('../img/profile1.jpeg')} />
        </div>
        <span>{user_name}</span>
      </div>
    </div>

    <div className='chaDiv'>
      <img className='chaImgSize' src={require('../img/monster1.png')} />
      <span>몬지몽탱이</span>
    </div>

    {/* 달력 div */}
    <div className='middleContentDiv'>
      <div className='calendarDiv'>
        <CalendarContainer>
          <Calendar onChange={setCalendarValue} value={calendarValue} />
        </CalendarContainer>
      </div>
      <div>
        클릭한 날짜: {clickDate}
      </div>
      <br />

      {/* Todo 템플릿 */}
      <div className='TodoTemplate'>
        <div className='TodoInputDiv'>
          <button className='todoAddBtn' onClick={() => handleDoAdd()}>
            일반 +
          </button>
          {
            isAdd ? <TodoInput onInsert={onInsert} /> : ''
          }
        </div>

        <TodoList
          todos={todolistData}
          onToggle={onToggle}
          onRemove={onRemove}
          onChangeSelectedTodo={onChangeSelectedTodo}
          onInsertToggle={onInsertToggle}
        />
        {insertToggle && (
          <TodoEdit
            onInsert={onInsert}
            selectedTodo={selectedTodo}
            onInsertToggle={onInsertToggle}
            onUpdate={onUpdate}
            insertToggle={insertToggle}
          />
        )}
        <div>
        </div>
        <br />


      </div>
    </div>
  </div>
  )
}

export default Todo;