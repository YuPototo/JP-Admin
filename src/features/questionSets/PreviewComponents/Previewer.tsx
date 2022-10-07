import { useEffect, useState } from 'react'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { errorReset } from '../questionSetEditorSlice'
import QuestionSet from './QuestionSet'

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

    useEffect(() => {
        if (isOpen) {
            dispatch(errorReset())
        }
    }, [isOpen, dispatch])

    const hasValidtionError = useAppSelector(
        (state) => state.questionSetEditor.validationError !== null
    )

    return (
        <MyModal
            isOpen={isOpen}
            onModalClosed={onClose}
            bottom="20px"
            top="20px"
            transform="translate(-50%)"
        >
            <div className="w-screen max-w-4xl overflow-y-scroll">
                <h2 className="mb-4 text-2xl font-bold text-green-700">预览</h2>

                <QuestionSet />

                <div className="mt-10 flex gap-6">
                    <Button outline color="gray" onClick={onClose}>
                        返回
                    </Button>
                    <Button disabled={hasValidtionError}>提交</Button>
                </div>
            </div>
        </MyModal>
    )
}
