import React from 'react'
import { MaybeQuestion } from '../questionSetTypes'
import QuestionBody from './QuestionBody'
import QuestionExplanation from './QuestionExplanation'
import QuestionOptions from './QuestionOptions'

type Props = {
    question: MaybeQuestion
    index: number
}

export default function Question({ question, index }: Props) {
    return (
        <div className="flex flex-col gap-3 ">
            <div className="font-bold text-green-700">第{index + 1}题</div>
            <div className="ml-4 flex flex-col gap-4">
                <QuestionBody body={question.body} />
                <QuestionOptions
                    options={question.options}
                    answer={question.answer}
                />
                <QuestionExplanation explanation={question.explanation} />
            </div>
        </div>
    )
}
