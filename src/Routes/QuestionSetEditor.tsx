import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import AudioPart from '../features/questionSets/EditComponents/AudioPart'
import Previewer from '../features/questionSets/PreviewComponents/Previewer'
import QuestionListPart from '../features/questionSets/EditComponents/QuestionListPart'
import QuestionSetBodyPart from '../features/questionSets/EditComponents/QuestionSetBodyPart'
import QuesitonSetExplanationPart from '../features/questionSets/EditComponents/QuestionSetExpalanationPart'
import {
    chapterUsed,
    questionSetCreated,
    questionSetReceived,
} from '../features/questionSets/questionSetEditorSlice'
import { useGetQuestionSetQuery } from '../features/questionSets/questionSetService'
import useAuthGuard from '../features/user/useAuthGuard'
import { useAppDispatch } from '../store/hooks'

export enum EditType {
    New = 'new',
    Update = 'update',
}

const Title = {
    new: '新增题目',
    update: '编辑题目',
}

export default function QuestionSetEditor() {
    useAuthGuard()
    let [searchParams] = useSearchParams()
    const editType = searchParams.get('editType') as EditType

    usePrepareNewQuestionSet(editType)
    const isLoading = usePrepareUpdatingQuestionSet(editType)

    const title = Title[editType]

    return (
        <PageLayout>
            <div className="text-xl text-white">{title}</div>

            <div className="my-8 flex flex-col gap-5">
                {isLoading ? (
                    <div className="text-lg text-white">加载中...</div>
                ) : (
                    <>
                        <QuestionSetBodyPart />
                        <AudioPart />
                        <QuestionListPart />
                        <QuesitonSetExplanationPart />
                    </>
                )}

                <Previewer editType={editType} />
            </div>
        </PageLayout>
    )
}

/**
 * 新增一个 question set
 */
export function usePrepareNewQuestionSet(editType: EditType) {
    const dispatch = useAppDispatch()

    let [searchParams] = useSearchParams()
    const chapterId = searchParams.get('chapterId')

    useEffect(() => {
        if (editType === EditType.New) {
            if (chapterId) {
                dispatch(chapterUsed(chapterId))
            } else {
                throw Error('query 里没有 chapter id')
            }
            dispatch(questionSetCreated())
        }
    }, [editType, chapterId, dispatch])
}

/**
 * 更新 question set
 */
export function usePrepareUpdatingQuestionSet(editType: EditType) {
    const dispatch = useAppDispatch()
    let [searchParams] = useSearchParams()

    const questionSetId = searchParams.get('questionSetId')

    const { data, isLoading } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === null,
    })

    useEffect(() => {
        if (editType === EditType.Update) {
            console.log('data', data)
            data && dispatch(questionSetReceived(data!))
        }
    }, [editType, data, dispatch])

    return isLoading
}
