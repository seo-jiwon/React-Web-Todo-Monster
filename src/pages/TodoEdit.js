import { useCallback, useEffect, useState, useRef } from 'react';
import '../css/TodoEdit.css';

function TodoEdit({ selectedTodo, onUpdate }) {
  const [value, setValue] = useState('');
  const modalRef = useRef();

  // 수정 값 변경
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  // form submit
  const onSubmit = useCallback(
    (e) => {
      onUpdate(selectedTodo.do_id, value);
      setValue(''); //value 초기화
      e.preventDefault(); // 새로고침 방지
    },
    [onUpdate, value],
  );

  // 수정 form 열린 후 초기 input 입력된 값
  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.do_content);
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
