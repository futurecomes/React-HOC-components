import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Button from 'src/shared/components/old/interactive/Button';

import closeSrc from './static/svg/close.svg';

import { css } from 'src/styles/old';
import styles, { modalStyles } from './styles';

class Modal extends Component {
    render() {
        const { isOpen, text, type, confirmText, cancelText, onClose, onConfirm, onCancel } = this.props;

        return (
            <ReactModal isOpen={isOpen} style={modalStyles} contentLabel={text}>
                <button onClick={onClose} className={css(styles.close)}>
                    <img src={closeSrc} alt="Close Modal" />
                </button>
                <span className={css(styles.title)}>{text}</span>
                <div className={css(styles.btnContainer)}>
                    <Button onClick={onConfirm} style={styles.btnConfirm} type={type}>
                        {confirmText}
                    </Button>
                    <Button onClick={onCancel} style={styles.btnCancel} type="white">
                        {cancelText}
                    </Button>
                </div>
            </ReactModal>
        );
    }
}

Modal.defaultProps = {
    type: 'red',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
};

export default Modal;
