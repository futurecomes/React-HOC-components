import React from 'react'
import Modal from 'react-responsive-modal'
import { noop as _noop } from 'lodash'

import * as S from './styled'

export class EditorModal extends React.Component {
    state = {
        isOpen: true,
    }

    closeModal = () => this.setState({ isOpen: false })

    render() {
        return (
            <Modal
                open={this.state.isOpen && this.props.isModalOpen}
                onClose={_noop}
                closeOnEsc={false}
                closeOnOverlayClick={false}
                styles={{ closeIcon: { display: 'none' }, modal: { margin: '0 auto' } }}
            >
                <S.ModalWrapper>
                    <S.Title>Pick one option</S.Title>
                    {this.props.description}

                    <S.Buttons>{this.props.options(this.closeModal)}</S.Buttons>
                </S.ModalWrapper>
            </Modal>
        )
    }
}
