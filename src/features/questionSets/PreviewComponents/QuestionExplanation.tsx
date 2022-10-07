import React from 'react'

type Props = {
    explanation?: string
}

export default function QuestionExplanation({ explanation }: Props) {
    if (explanation === undefined) {
        return <></>
    }

    if (explanation === '') {
        return (
            <div className="font-bold text-red-700">
                解析为空白。如果不需要解析，请移除。
            </div>
        )
    }

    return <div>{explanation}</div>
}
