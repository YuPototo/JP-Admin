import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { errorDiscovered } from '../questionSetEditorSlice'
import { RichTextNode } from '../questionSetTypes'
import Option from './Option'

type Props = {
    options: RichTextNode[][]
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
                <div key={index}>
                    <Option option={option} isAnswer={index === answer} />
                </div>
            ))}
        </div>
    )
}
