import React from 'react';
import './Modal.css';

function Modal(props) {
  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <span className='close' onClick={props.onClose}>&times;</span>
          {props.children}
      </div>
    </div>
  )
}

export default Modal;
