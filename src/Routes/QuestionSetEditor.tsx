import { useParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import { useGetQuestionSetQuery } from '../features/questionSets/questionSetService'
import useAuthGuard from '../features/user/useAuthGuard'

export default function QuestionSetEditor() {
    useAuthGuard()
    let { questionSetId } = useParams() as {
        questionSetId: string
    }

    const { data } = useGetQuestionSetQuery(questionSetId)

    return <PageLayout>{data && <div>{JSON.stringify(data)}</div>}</PageLayout>
}
