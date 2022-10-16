import React from 'react'
import { IQuestion } from '../questionSetTypes'
import Question from './Question'

type Props = {
    questions?: IQuestion[]
}

export default function Questions({ questions }: Props) {
    return (
        <div>
            {questions?.map((question, index) => (
                <div key={index}>
                    <Question question={question} index={index} />
                </div>
            ))}
        </div>
    )
}
