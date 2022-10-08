import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import { EditType } from '../../../routes/QuestionSetEditor'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    errorReset,
    questionSetSubmitted,
    selectAddQuestionSetPayload,
    selectUpdateQuestionSetPayload,
} from '../questionSetEditorSlice'
import {
    useAddQuestionSetMutation,
    useUpdateQuestionSetMutation,
} from '../questionSetService'
import QuestionSet from './QuestionSet'

export default function Previewer({ editType }: { editType: EditType }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <PreviewModal
                editType={editType}
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
    editType,
    isOpen,
    onClose,
}: {
    editType: EditType
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

    const [addQuestionSet, { isLoading: isAdding }] =
        useAddQuestionSetMutation()
    const [updateQuestionSet, { isLoading: isUpdating }] =
        useUpdateQuestionSetMutation()

    const hasValidtionError = useAppSelector(
        (state) => state.questionSetEditor.validationError !== null
    )

    const newQuestionSetPayload = useAppSelector(selectAddQuestionSetPayload)

    const handleCreateNew = async () => {
        if (!newQuestionSetPayload) {
            toast.error('请先填写题目')
            return
        }

        try {
            await addQuestionSet(newQuestionSetPayload).unwrap()
            toast.success('成功添加题目')
            setTimeout(() => {
                navigate(-1)
                dispatch(questionSetSubmitted())
            }, 1000)
        } catch (err) {
            // 在 middlware 处理了
        }
    }

    const updateQuestionSetPayload = useAppSelector(
        selectUpdateQuestionSetPayload
    )
    const handleUpdate = async () => {
        if (!updateQuestionSetPayload) {
            toast.error('找不到题目')
            return
        }

        try {
            await updateQuestionSet(updateQuestionSetPayload).unwrap()
            toast.success('成功修改题目')
            setTimeout(() => {
                navigate(-1)
                dispatch(questionSetSubmitted())
            }, 1000)
        } catch (err) {
            // 在 middlware 处理了
        }
    }

    const handleSubmit = async () => {
        if (editType === EditType.New) {
            await handleCreateNew()
        } else if (editType === EditType.Update) {
            await handleUpdate()
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
                        disabled={hasValidtionError || isAdding || isUpdating}
                    >
                        提交
                    </Button>
                </div>
            </div>
        </MyModal>
    )
}
