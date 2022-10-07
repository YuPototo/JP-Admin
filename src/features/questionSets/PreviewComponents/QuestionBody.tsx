import React from 'react'

type Props = {
    body?: string
}

export default function QuestionBody({ body }: Props) {
    if (body === undefined) {
        return <></>
    }

    if (body === '') {
        return (
            <div className="font-bold text-red-700">
                题干为空白。如果不需要，请移除题干。
            </div>
        )
    }

    return <div>{body}</div>
}
