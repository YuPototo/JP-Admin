import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { errorDiscovered } from '../questionSetEditorSlice'
import Option from './Option'

type Props = {
    options: string[]
    answer?: number
}

export default function QuestionOptions({ options, answer }: Props) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (answer === undefined) {
            dispatch(errorDiscovered('没有选择答案 '))
        }
    }, [answer, dispatch])

    return (
        <div className="ml-4">
            {answer === undefined && (
                <div className="font-bold text-red-700">没有选择答案</div>
            )}

            {options.map((option, index) => (
                <div>
                    <Option option={option} isAnswer={index === answer} />
                </div>
            ))}
        </div>
    )
}
