import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import AudioPlayer from './AudioPlayer'
import Questions from './Questions'
import QuestionSetBody from './QuestionSetBody'
import QuestionSetExplanation from './QuestionSetExplanation'
import Transcription from './Transcription'

export default function QuestionSet() {
    const questionSet = useAppSelector(
        (state) => state.questionSetEditor.questionSet
    )

    if (!questionSet) {
        return <div className="text-2xl text-red-700">出错了！找不到题目</div>
    }

    return (
        <div className="flex flex-col gap-8">
            <QuestionSetBody body={questionSet.body} />

            <AudioPlayer url={questionSet.audio?.key} />

            <Transcription text={questionSet.audio?.transcription} />

            <Questions questions={questionSet.questions} />

            <QuestionSetExplanation explanation={questionSet.explanation} />
        </div>
    )
}
