import React from 'react'
import Modal from 'react-modal'

type Props = {
    isOpen: boolean
    onModalClosed: () => void
    children: React.ReactNode
}

export default function MyModal({ isOpen, onModalClosed, children }: Props) {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onModalClosed}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            {children}
        </Modal>
    )
}
