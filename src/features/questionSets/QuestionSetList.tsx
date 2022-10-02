import React from 'react'
import { Link } from 'react-router-dom'
import { useGetChapterQuery } from './questionSetService'

type Props = {
    chapterId: string
}

export default function QuestionSetList({ chapterId }: Props) {
    const { data, isLoading } = useGetChapterQuery(chapterId)

    const questionSetIds = data?.questionSets

    return (
        <div className="rounded bg-white p-4">
            <h3 className="mb-3 font-semibold text-green-700">题目列表</h3>

            {isLoading && (
                <div className="flex flex-col gap-3">
                    <div className="skeleton h-8 w-64"></div>
                    <div className="skeleton h-8 w-64"></div>
                    <div className="skeleton h-8 w-64"></div>
                    <div className="skeleton h-8 w-64"></div>
                </div>
            )}

            {questionSetIds?.map((questionSetId, index) => (
                <Link
                    to={`/questionSetEditor/${questionSetId}`}
                    key={questionSetId}
                >
                    <div className="m-1 flex gap-2 p-2 text-gray-700 hover:bg-green-100">
                        <span>第{index + 1}题</span>
                        <span>{questionSetId}</span>
                    </div>
                </Link>
            ))}

            {questionSetIds?.length === 0 && <div>这一小节还没有题目</div>}
        </div>
    )
}
