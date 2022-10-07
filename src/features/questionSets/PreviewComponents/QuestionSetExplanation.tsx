import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { errorDiscovered } from '../questionSetEditorSlice'

type Props = {
    explanation?: string
}

export default function QuestionSetExplanation({ explanation }: Props) {
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
