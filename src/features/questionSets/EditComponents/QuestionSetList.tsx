import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Skeleton from '../../../components/ui/Skeleton'
import { useGetChapterInfoQuery } from '../questionSetService'

type Props = {
    chapterId: string
}

export default function QuestionSetList({ chapterId }: Props) {
    const { data, isLoading } = useGetChapterInfoQuery(chapterId)

    const questionSetIds = data?.questionSets

    return (
        <div className="rounded bg-white p-4">
            <h3 className="mb-3 font-semibold text-green-700">题目列表</h3>

            {isLoading && <QuestionSetListSkeleton />}

            {questionSetIds?.map((questionSetId, index) => (
                <Link
                    to={`/questionSetEditor?questionSetId=${questionSetId}`}
                    key={questionSetId}
                >
                    <div className="m-1 flex gap-2 p-2 text-gray-700 hover:bg-green-100">
                        <span>第{index + 1}题</span>
                        <span>{questionSetId}</span>
                    </div>
                </Link>
            ))}

            {questionSetIds?.length === 0 && <div>这一小节还没有题目</div>}

            <div className="mt-4">
                <Link to={`/addQuestionSet?chapterId=${chapterId}`}>
                    <Button outline>新增题目</Button>
                </Link>
            </div>
        </div>
    )
}

function QuestionSetListSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            <Skeleton w="w-64" />
            <Skeleton w="w-64" />
            <Skeleton w="w-64" />
            <Skeleton w="w-64" />
        </div>
    )
}
