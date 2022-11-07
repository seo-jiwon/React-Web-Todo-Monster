import { useCallback, useEffect, useState, useRef } from 'react';
import '../css/TodoEdit.css';

function TodoEdit({ selectedTodo, onUpdate, btnClick, isClickFilterBtn }) {
  const [value, setValue] = useState('');
  const modalRef = useRef();

  // 영역 내 클륵시 토글로 생성한 창 닫기
  // useEffect(() => {
  //   document.addEventListener('mousedown', clickModalOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', clickModalOutside);
  //   };
  // });


  // const clickModalOutside = event => {
  //   if (btnClick && !modalRef.current.contains(event.target)) {
  //     isClickFilterBtn();
  //   }
  // };

  // 수정 값 변경
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  // form submit
  const onSubmit = useCallback(
    (e) => {
      onUpdate(selectedTodo.id, value);
      setValue(''); //value 초기화
      e.preventDefault(); // 새로고침 방지
    },
    [onUpdate, value],
  );

  // 수정 form 열린 후 초기 input 입력된 값
  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
    }
  }, [selectedTodo]);

  return (
    <div className="TodoEdit" ref={modalRef}>
      <form onSubmit={onSubmit} className="todoEditForm">
        <h2>할 일 수정</h2>
        <input onChange={onChange} value={value} />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}

export default TodoEdit;
