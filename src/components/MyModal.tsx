import React from 'react'
import Modal from 'react-modal'

type Props = {
    isOpen: boolean
    onModalClosed: () => void
    children: React.ReactNode
    top?: string
    bottom?: string
    transform?: string
}

export default function MyModal({
    isOpen,
    onModalClosed,
    children,
    top = '50%',
    bottom = 'auto',
    transform = 'translate(-50%, -50%)',
}: Props) {
    const customStyles = {
        content: {
            top,
            left: '50%',
            right: 'auto',
            bottom,
            marginRight: '-50%',
            transform,
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
