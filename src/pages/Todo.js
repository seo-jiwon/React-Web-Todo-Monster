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
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

// 캘린더 디자인
const CalendarContainer = styled.div`
  /* 전체 */
  .react-calendar {
    margin: auto;
    background-color: white;
    padding: 3%;
    border-radius: 3px;
    border: 0px solid #F6E9FF;
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
    background-color: #FAF3FF;
    border: 0;
    border-radius: 3px;
    color: black;
    padding: 5px 0;
  }

  /* 클릭 시 유지되는 색상 */
  button:enabled:hover {
    background-color: rgb(139, 105, 168);
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

  /* 날짜 타일 */
  .react-calendar__tile {
    border-radius: 50%;
    width: 60%;
    margin-left: 10px;
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    background: rgb(139, 105, 168);
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
  }
  
  /* 해당 달 외 다른 달 */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.5;
  }
`;


let clickDate; // 캘린더 클릭한 날짜
let dbDate; // 디비에 저장된 날짜

// 유저 정보
let user_id;
let user_name;
let cate_id;
let user_email;

function Todo() {
  const nextId = useRef(1); // 아이디 1부터
  const [todos, setTodos] = useState([]); // 할 일 저장할 배열
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date()); // 캘린더 날짜
  const [isAdd, setIsAdd] = useState(false); // 할 일 추가 버튼 visible 여부
  const [userId, setUserId] = useState(""); // 유저 아이디
  const [userName, setUserName] = useState(""); // 유저 이름
  const [userEmail, setUserEmail] = useState(""); // 유저 이메일
  const [dateList, setDateList] = useState([]); // 날짜별 할 일 목록 저장할 배열
  const [cateList, setCateList] = useState([]); // 카테고리 버튼 상태 저장할 배열
  const [cateId, setCateId] = useState(""); // 클릭한 카테고리 번호
  const [monster, setMonster] = useState([]);// 몬스터 정보
  const [monsterLv, setMonsterLv] = useState('');//몬스터레벨
  const [userImg, setUserImg] = useState("");// 유저 이미지

  const navigate = useNavigate();
  clickDate = moment(calendarValue).format("YYYY-MM-DD"); // 캘린더 클릭한 날짜 한국 시간대

  //유저 로그인 정보
  useEffect(() => {
    axios.get("/isLogged/isLogged").then((res) => {
      var userData = res.data.user[0];
      if (res.status) {
        setUserId(userData.user_id);
        setUserName(userData.name);
        setUserEmail(userData.email);
        setUserImg(userData.profile_img);
      }
    });
  }, []);

  user_id = userId;
  user_name = userName;
  user_email = userEmail;
  // console.log(userId); 2번

  //몬스터정보 불러오기
  useEffect(() => {
    const data = {
      userId: user_id
    }

    axios.post("/monster/monsterInfo", data).then((res) => {
      setMonster(res.data);
    });

    axios.post("/monster/monsterLv", data).then((res) => {
      setMonsterLv(res.data[0].count);
    })
  }, [user_id, todos]);

  // 할 일 목록 불러오기 todolistData 선언
  const todolistData = useFetch('/todolist/todolist');

  // 할 일 카테고리 불러오기
  const todoCateList = useFetch('/todolist/todoCate');
  function useFetch(url) {
    const [data, setData] = useState([]);

    async function fetchUrl() {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    }

    useEffect(() => {
      fetchUrl();
    }, []);
    return data;
  }

  // 날짜별 할 일 목록 추출
  useEffect(() => {
    
    // 배열 초기화
    setDateList((dateList) => dateList.splice(0, dateList.length));

    // 할 일 배열이 빈 배열이 아닌 경우
    if (todolistData.length > 0) {

      // 할 일 배열 길이 만큼 반복문
      for (var i = 0; i < todolistData.length; i++) {

        // 할 일 날짜 추출
        dbDate = moment(todolistData[i].do_date).format("YYYY-MM-DD");

        // 캘린더 클릭한 날짜와 디비에 저장된 할 일 날짜가 같은 경우
        if (clickDate === dbDate) {

          const doList = {
            do_id: todolistData[i].do_id,
            do_content: todolistData[i].do_content,
            do_isDone: todolistData[i].do_isDone,
            cate_id: todolistData[i].cate_id,
          }
          // console.log(doList);
          setDateList((dateList) => dateList.concat(doList));
        }
      }
    }
  },[clickDate, todolistData]);

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
  const onInsert = useCallback((text, cateId) => {
    const todo = {
      do_id: nextId.current,
      do_content: text,
      do_isDone: false,
      cate_id: cateId,
    };
    // console.log(todo.cate_id);
    setTodos((todos) => todos.concat(todo)); // concat(): 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열 반환
    nextId.current++; // nextId 1씩 더하기

    const data = {
      do_content: todo.do_content,
      user_id: user_id,
      do_date: clickDate,
      do_isDone: todo.do_isDone,
      cate_id: cateId
    }
    axios.post("/todolist/todoInput", data)
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          console.log('할 일 입력 성공!');
          // window.location.reload();
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
          // window.location.reload();
          navigate("/");
        }
      }).catch(function (error) {
        alert("할 일 삭제 실패!" + error);
      });
  }, []);

  // 할 일 전체 삭제 시 호출되는 함수
  // const onRemoveAll = useCallback((id) => {

  // }, []);

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
            // window.location.reload();
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
        todo.do_id === id ? { ...todo, checked: !todo.do_isDone } : todo,
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
          // window.location.reload();
          navigate('/');
        }
      }).catch(function (error) {
        alert("할 일 체크 실패!" + error);
      });
  }, []);

  // 카테고리 버튼 상태 저장하는 배열 생성, 초기에 false로 설정
  useEffect(() => {
    const cateListState = {
      cate_id: cate_id,
      state: false,
    };
    for (var i = 0; i < todoCateList.length; i++) {
      setCateList((cateList) => cateList.concat(cateListState)); // 카테고리 버튼 상태 저장, false로 초기화
    }
    console.log(cateList);
  }, []);

  // 카테고리 클릭 시 입력 컴포넌트 open, close
  let clickCnt = 0;
  const handleDoAdd = useCallback((cate_id,) => {
    console.log(cate_id + '번 카테고리 클릭');

    clickCnt++; // 버튼 클릭 횟수 카운트

    // 짝수 번 클릭 시 input창 close
    if (clickCnt % 2 === 0) {
      setIsAdd(false);
      cateList[cate_id - 1] = 'false';
      console.log(cateList);
    }
    // 홀수 번 클릭 시 input창 open
    else {
      setIsAdd(true);
      cateList[cate_id - 1] = 'true';
      console.log(cateList);
    }
  }, []);

  cate_id = cateId;

  function CateItem({ cate_id, cate_name }) {

    return (
      <span>
        <button className='todoCateBtn' onClick={() => { handleDoAdd(cate_id, todoCateList) }}>
          {cate_name} +
        </button>

        {
          cateList[cate_id - 1] === 'true' ? <TodoInput onInsert={onInsert} cate_id={cate_id} /> : ''
        }
        <TodoList
          todos={dateList}
          onToggle={onToggle}
          onRemove={onRemove}
          onChangeSelectedTodo={onChangeSelectedTodo}
          onInsertToggle={onInsertToggle}
          cate_id={cate_id}
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
      </span>
    )
  }

  function createMonster() {
    navigate("/createMonster")
  }

  // 할 일 목록 불러오기 useFetch()
  function useFetch(url) {
    const [data, setData] = useState([]);

    // json 형식
    async function fetchUrl() {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      // console.log('가져오기');
    }

    useEffect(() => {
      fetchUrl();
    },[todos]);

    return data;
  }

  // console.log(userImg);
  return (
    <motion.div className="todoContent"
      initial={{ x: window.innerWidth }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header">
        <Headerbar user_id={user_id} user_name={user_name} user_email={user_email} user_img={userImg} />
      </div>

      <div className="leftContentDiv">
        <div className="followListDiv">
          <div className="followListBtnDiv">
            <img className='followListImgSize' src={require('../img/profile1.jpeg')} onClick={() => { alert('클릭') }} />
            <div className='followListNameDiv'>{user_name}</div>
          </div>
          <div className="followListBtnDiv">
            <img className='followListImgSize' src={require('../img/profile2.jpeg')} />
            <div className='followListNameDiv'>사용자</div>
          </div>
          <div className="followListBtnDiv">
            <img className='followListImgSize' src={require('../img/profile3.jpeg')} />
            <div className='followListNameDiv'>사용자</div>
          </div>
          <div className="followListBtnDiv">
            <button className='followListDetailBtn' onClick={() => { alert('클릭') }}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        <div className='profileDiv'>
          <div className='profileNameDiv'>
            {user_name}
          </div>
          <div className='profileImgDiv'>
            {userImg === null ? <img className='profileImgSize' src={require('../img/profile1.jpeg')}/> : userImg === '' ? <img className='profileImgSize' src={require('../img/profile1.jpeg')}/> : <img className='profileImgSize' src={userImg}/>}
            
          </div>
        </div>
      </div>

      {monster.length > 0 ?
        <div className='chaDiv'>
          {monsterLv < 1 ? <img className='chaImgSize' src={require("../img/dust_blue_1.jpg")}></img> : monsterLv < 2 ? <img className='chaImgSize' src={require("../img/dust_blue_2.jpg")}></img> : <img className='chaImgSize' src={require("../img/dust_blue.jpg")}></img>}
          <span>{monster[0].mon_name} Lv.{monster[0].mon_level}</span>
        </div> :
        <div className='chaDiv'>
          <Button onClick={() => createMonster()}>캐릭터생성</Button>
        </div>
      }

      {/* 달력 div */}
      <div className='middleContentDiv'>
        <div className='calendarDiv'>
          <CalendarContainer>
            <Calendar onChange={setCalendarValue} value={calendarValue} />
          </CalendarContainer>
        </div>

        <br />
        {/* Todo 템플릿 */}
        <div className='TodoTemplate'>
          <div className='TodoInputDiv'>
            {todoCateList.map(
              ({ cate_id, cate_name }) => (
                <CateItem
                  key={cate_id}
                  cate_id={cate_id}
                  cate_name={cate_name}
                />
              )
            )
            }
          </div>
          <div>
          </div>
          <br />


        </div>
      </div>
    </motion.div>
  )
}

export default Todo;