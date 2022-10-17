import React from 'react'
import { MaybeQuestion } from '../questionSetTypes'
import Question from './Question'

type Props = {
    questions?: MaybeQuestion[]
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
