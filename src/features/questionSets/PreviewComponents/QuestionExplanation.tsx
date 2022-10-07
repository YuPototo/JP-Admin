import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { errorDiscovered } from '../questionSetEditorSlice'

type Props = {
    explanation?: string
}

export default function QuestionExplanation({ explanation }: Props) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (explanation === '') {
            dispatch(
                errorDiscovered('小题解析为空白。如果不需要，请移除题干。')
            )
        }
    }, [explanation, dispatch])

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
