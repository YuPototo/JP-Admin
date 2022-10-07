import React from 'react'

type Props = {
    explanation?: string
}

export default function QuestionSetExplanation({ explanation }: Props) {
    if (explanation === undefined) {
        return <></>
    }

    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-bold text-green-700">大题解析</h3>
            {explanation === '' ? (
                <div className="font-bold text-red-700">
                    解析为空白。如果不需要，请移除解析。
                </div>
            ) : (
                <div>{explanation}</div>
            )}
        </div>
    )
}
