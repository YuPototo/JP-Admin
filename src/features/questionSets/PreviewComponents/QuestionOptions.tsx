import clsx from 'clsx'
import React from 'react'

type Props = {
    options: string[]
    answer?: number
}

export default function QuestionOptions({ options, answer }: Props) {
    return (
        <div className="ml-4">
            {answer === undefined && (
                <div className="font-bold text-red-700">没有选择答案</div>
            )}

            {options.map((option, index) => (
                <div
                    className={clsx(
                        'my-2 px-4 py-2',
                        answer === index ? 'bg-green-100' : 'bg-gray-100',
                        option === '' && 'text-red-700'
                    )}
                    key={index}
                >
                    {option || '选项不能空白！'}
                </div>
            ))}
        </div>
    )
}
