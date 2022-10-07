import { useState } from 'react'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import { useAppDispatch } from '../../../store/hooks'

export default function Previewer() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <PreviewModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <Button onClick={() => setShowModal(true)}>预览题目</Button>
        </>
    )
}

function PreviewModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) {
    const dispatch = useAppDispatch()

    return (
        <MyModal isOpen={isOpen} onModalClosed={onClose}>
            <div className=" w-screen max-w-4xl">
                <h2 className="mb-4 font-bold text-green-700">预览</h2>

                <div className="flex gap-4">
                    <Button outline color="gray" onClick={onClose}>
                        返回
                    </Button>
                    <Button>提交</Button>
                </div>
            </div>
        </MyModal>
    )
}
