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

export default function QuestionSetEditor() {
    useAuthGuard()
    usePrepareNewQuestionSet()
    usePrepareUpdatingQuestionSet()

    return (
        <PageLayout>
            <div className="text-xl text-white">题目编辑器</div>

            <div className="my-8 flex flex-col gap-5">
                <QuestionSetBodyPart />
                <AudioPart />
                <QuestionListPart />

                <QuesitonSetExplanationPart />

                <Previewer />
            </div>
        </PageLayout>
    )
}

/**
 * 新增一个 question set
 */
export function usePrepareNewQuestionSet() {
    const dispatch = useAppDispatch()

    let [searchParams] = useSearchParams()

    const chapterId = searchParams.get('chapterId')
    const editType = searchParams.get('editType')

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
export function usePrepareUpdatingQuestionSet() {
    const dispatch = useAppDispatch()
    let [searchParams] = useSearchParams()

    const questionSetId = searchParams.get('questionSetId')
    const editType = searchParams.get('editType')

    const { data } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === null,
    })

    useEffect(() => {
        if (editType === EditType.Update) {
            data && dispatch(questionSetReceived(data!))
        }
    }, [editType, data, dispatch])
}
