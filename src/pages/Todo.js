import React, { useCallback, useRef, useState } from 'react';
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

function Todo() {

  const [calendarValue, setCalendarValue] = useState(new Date());

  const [isAdd, setIsAdd] = useState(false);

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
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo)); //concat(): 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열 반환
    nextId.current++; //nextId 1씩 더하기
  }, []);

  // 할 일 삭제 시 호출되는 함수
  const onRemove = useCallback((id) => {
    // filter() : 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  // 할 일 전체 삭제 시 호출되는 함수
  const onRemoveAll = useCallback((id) => {

  }, []);

  // 할 일 수정 시 호출되는 함수
  const onUpdate = useCallback(
    (id, text) => {
      onInsertToggle();

      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
      );
    },
    [onInsertToggle],
  );

  // 할 일 checkBox
  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  return (<div className="todoContent">
    <div className="header">
      <Headerbar />
    </div>

    <div className="leftContentDiv">
      <div className="followListDiv">
        <div className="followListBtnDiv">
          <img className='followListImgSize' src={require('../img/profile1.jpeg')} onClick={() => { alert('클릭') }} />
          {/* <button className='followListBtn' onClick={() => { alert('클릭') }}></button> */}
          <p>zion</p>
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
        <span>zion</span>
      </div>
    </div>

    <div className='chaDiv'>
      <img className='chaImgSize' src={require('../img/monster1.png')} />
      <span>몬지몽탱이</span>
    </div>

    <div className='middleContentDiv'>
      <div className='calendarDiv'>
        <CalendarContainer>
          <Calendar onChange={setCalendarValue} value={calendarValue} />
        </CalendarContainer>
        <div>
          {moment(calendarValue).format("YYYY-MM-DD")}
        </div>
      </div>
      <br />
      <div className='TodoTemplate'>
        <div className='TodoInputDiv'>
          <button className='todoAddBtn' onClick={() => handleDoAdd()}>
            일반 +
          </button>
          {
            isAdd ? <TodoInput onInsert={onInsert} /> : ''
          }
        </div>

        {/* <TodoInput onInsert={onInsert} /> */}
        <TodoList
          todos={todos}
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