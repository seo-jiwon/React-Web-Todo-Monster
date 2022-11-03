import React from 'react';
import Modal from 'react-modal';
import "../css/Todo.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Headerbar from './Headerbar';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

function Todo() {

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }

    const todoInput = [
        {
            className1 : "todoCheckBox",
            className2 : "todoInput",
            component : <MoreHorizIcon />,
        },
    ]

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
                <Calendar />
            </div>
            <br/>
            <div>
                <button className='todoAddBtn' onClick={() => {}}>
                    일반 +
                </button>

                <div>
                    <input className='todoCheckBox' type='checkbox' />
                    <input className='todoInput' type='text' />
                    <MoreHorizIcon  onClick={openModal} />

                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        ariaHideApp={false}
                    >
                        <div className='todoModalHeaderDiv'>
                            <span className='todoModalName' ref={(_subtitle) => (subtitle = _subtitle)}>할 일</span>
                            <HighlightOffIcon className='todoModalCloseBtn' onClick={closeModal} />
                        </div>

                        <form>
                            <button className='todoUpdateBtn' onClick={() => { alert('수정') }}>수정</button>
                            <button className='todoDeleteBtn' onClick={() => { alert('삭제') }}>삭제</button>
                        </form>
                    </Modal>
                </div>

                <div>
                {todoInput.map((item, ind) => {
                        return (
                            <div key={ind}>
                                <input className={item.className1} type='checkbox' />
                                <input className={item.className2} />
                                {item.component}
                            </div>
                        )
                    })}
                </div>
                <br/>

                <div>
                    <MoreHorizIcon className='allSelectBtn' onClick={() => { alert('클릭') }}/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Todo;