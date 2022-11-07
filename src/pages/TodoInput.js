import React, { useCallback, useState } from 'react';
import '../css/TodoInput.css';

function TodoInput({onInsert}) {

    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, [])

    const onSubmit = useCallback(e => {
        onInsert(value);
        setValue(''); // input의 value 값 초기화
        e.preventDefault(); // 새로고침 방지
    },[onInsert, value])

    return (
        <form onSubmit={onSubmit}>
            <input className='todoInput' onChange={onChange} value={value} />
            <button className='todoAddBtn' type="submit">ADD</button>
        </form>
    )
}

export default TodoInput;