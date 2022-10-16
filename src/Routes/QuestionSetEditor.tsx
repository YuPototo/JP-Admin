import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import AudioPart from '../features/questionSets/EditComponents/AudioPart'
import Previewer from '../features/questionSets/PreviewComponents/Previewer'
import QuestionListPart from '../features/questionSets/EditComponents/QuestionListPart'
import QuestionSetBodyPart from '../features/questionSets/EditComponents/QuestionSetBodyPart'
import QuesitonSetExplanationPart from '../features/questionSets/EditComponents/QuestionSetExpalanationPart'
import {
    finishEditing,
    questionSetReceived,
} from '../features/questionSets/questionSetEditorSlice'
import { useGetQuestionSetQuery } from '../features/questionSets/questionSetService'
import useAuthGuard from '../features/user/useAuthGuard'
import { useAppDispatch } from '../store/hooks'

export default function QuestionSetEditor() {
    useAuthGuard()

    const dispatch = useAppDispatch()

    const { data, isLoading } = usePrepareUpdatingQuestionSet()

    useEffect(() => {
        return () => {
            dispatch(finishEditing())
        }
    }, [dispatch])

    return (
        <PageLayout>
            <div className="text-xl text-white">编辑题目</div>

            <div className="my-8 flex flex-col gap-5">
                {isLoading && (
                    <div className="text-lg text-white">加载中...</div>
                )}

                {data && (
                    <>
                        <QuestionSetBodyPart startingValue={data.body} />
                        <AudioPart />
                        <QuestionListPart initialValues={data.questions} />
                        <QuesitonSetExplanationPart
                            startingValue={data.explanation}
                        />
                    </>
                )}

                <Previewer editType="update" />
            </div>
        </PageLayout>
    )
}

/**
 * 更新 question set
 */
export function usePrepareUpdatingQuestionSet() {
    const dispatch = useAppDispatch()
    let [searchParams] = useSearchParams()

    const questionSetId = searchParams.get('questionSetId')

    const { data, isLoading } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === null,
    })

    useEffect(() => {
        data && dispatch(questionSetReceived(data!))
    }, [data, dispatch])

    return { data, isLoading }
}
