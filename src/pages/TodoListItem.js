import React, { useState } from 'react';
import '../css/TodoListItem.css';
import cn from 'classnames';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Modal from 'react-modal';

Modal.defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.55)"
  },
};

function TodoListItem({ todo, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle }) {
  const { id, text, checked } = todo;

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
      setIsOpen(true);
    }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <li className="TodoListItem">
        <div
          className={cn('checkbox', { checked: checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          <div className="text">{text}</div>
        </div>

        {/* 할 일 상세 모달 창 */}
        <div>
          <MoreHorizIcon  onClick={openModal} />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
            className='todoModal'
          >
            <div className='todoModalCloseDiv'>
              <HighlightOffIcon className='todoModalCloseBtn' onClick={closeModal} />
            </div>
            <div className='todoModalNameDiv'>
              <p className='todoModalName' ref={(_subtitle) => (subtitle = _subtitle)}>{text}</p>
            </div>

            <button className='todoUpdateBtn' onClick={() => { closeModal(); onChangeSelectedTodo(todo); onInsertToggle(); }}>수정하기</button>
            <button className='todoDeleteBtn' onClick={() => { onRemove(id); closeModal(); }}>삭제하기</button>
          </Modal>
        </div>

        {/* 전체 삭제 */}
        {/* <div>
          <MoreHorizIcon className='allSelectBtn' onClick={() => { alert('클릭') }}/>
        </div> */}
      </li>
    </div>
  );
}

export default React.memo(TodoListItem);
