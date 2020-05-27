import React from 'react';
import modalstyle from '../../styles/modal.module.scss';

function Modal (props) {

    return (
        <div onClick={() => {props.setModalVisible(false)}} className={props.modalVisible ? modalstyle.modal : modalstyle.hidden}>
                {props.child}
        </div>
    )

}

export default Modal;