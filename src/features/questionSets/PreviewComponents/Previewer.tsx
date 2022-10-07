import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    errorReset,
    questionSetSubmitted,
    selectAddQuestionSetPayload,
} from '../questionSetEditorSlice'
import { useAddQuestionSetMutation } from '../questionSetService'
import QuestionSet from './QuestionSet'

export default function Previewer() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <PreviewModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <div className="self-center">
                <Button padding="px-12 py-2" onClick={() => setShowModal(true)}>
                    预览题目
                </Button>
            </div>
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
    const navigate = useNavigate()

    useEffect(() => {
        if (isOpen) {
            dispatch(errorReset())
        }
    }, [isOpen, dispatch])

    const [addQuestionSet, { isLoading }] = useAddQuestionSetMutation()

    const hasValidtionError = useAppSelector(
        (state) => state.questionSetEditor.validationError !== null
    )

    const payload = useAppSelector(selectAddQuestionSetPayload)

    const handleSubmit = async () => {
        if (!payload) {
            toast.error('请先填写题目')
            return
        }

        try {
            await addQuestionSet(payload).unwrap()
            toast.success('成功添加题目')
            setTimeout(() => {
                navigate(-1)
                dispatch(questionSetSubmitted())
            }, 1000)
        } catch (err) {
            // 在 middlware 处理了
        }
    }

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
                    <Button
                        onClick={handleSubmit}
                        padding="px-8"
                        disabled={hasValidtionError || isLoading}
                    >
                        提交
                    </Button>
                </div>
            </div>
        </MyModal>
    )
}
