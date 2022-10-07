import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import AudioPart from '../features/questionSets/EditComponents/AudioPart'
import Previewer from '../features/questionSets/PreviewComponents/Previewer'
import QuestionListPart from '../features/questionSets/EditComponents/QuestionListPart'
import QuestionSetBodyPart from '../features/questionSets/EditComponents/QuestionSetBodyPart'
import QuesitonSetExplanationPart from '../features/questionSets/EditComponents/QuestionSetExpalanationPart'
import { questionSetCreated } from '../features/questionSets/questionSetEditorSlice'
import { useGetQuestionSetQuery } from '../features/questionSets/questionSetService'
import useAuthGuard from '../features/user/useAuthGuard'
import { useAppDispatch } from '../store/hooks'

export default function QuestionSetEditor() {
    useAuthGuard()
    const dispatch = useAppDispatch()

    let { questionSetId } = useParams() as {
        questionSetId: string
    }

    useEffect(() => {
        console.log('questionSetId', questionSetId)
        if (questionSetId === 'new') {
            dispatch(questionSetCreated())
        }
    }, [questionSetId, dispatch])

    const { data } = useGetQuestionSetQuery(questionSetId, {
        skip: questionSetId === 'new',
    })

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
