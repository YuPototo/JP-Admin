import React from 'react'
import { Link } from 'react-router-dom'
import { useGetChapterQuery } from './questionSetService'

type Props = {
    chapterId: string
}

export default function QuestionSetList({ chapterId }: Props) {
    const { data } = useGetChapterQuery(chapterId)

    const { questionSets } = data || {}
    if (questionSets === undefined || questionSets.length === 0) {
        return <div>这一小节还没有题目</div>
    }

    return (
        <div className="rounded bg-white p-4">
            <h3 className="mb-3 font-semibold text-green-700">题目列表</h3>
            {questionSets.map((questionSetId, index) => (
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
        </div>
    )
}
