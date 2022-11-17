import React, { useCallback, useState, useEffect } from 'react';
import '../css/TodoInput.css';

function TodoInput({ onInsert, cate_id }) {

    const cateId = cate_id;

    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, [])

    const onSubmit = useCallback(e => {
        onInsert(value, cateId);
        setValue(''); // input의 value 값 초기화
        e.preventDefault(); // 새로고침 방지
    }, [onInsert, value])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input className='todoInput' onChange={onChange} value={value} name="do_content" />
                <button className='todoAddBtn' type="submit">ADD</button>
            </form>
        </div>

    )
}

export default TodoInput;