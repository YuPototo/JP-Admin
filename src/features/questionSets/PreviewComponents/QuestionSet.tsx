import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import { selectFormatedQuestionSet } from '../questionSetEditorSlice'
import AudioPlayer from './AudioPart'
import Questions from './Questions'
import QuestionSetBody from './QuestionSetBody'
import QuestionSetExplanation from './QuestionSetExplanation'

export default function QuestionSet() {
    const questionSet = useAppSelector(selectFormatedQuestionSet)

    if (!questionSet) {
        return <div className="text-2xl text-red-700">出错了！找不到题目</div>
    }

    return (
        <div className="flex flex-col gap-8">
            <QuestionSetBody body={questionSet.body} />

            <AudioPlayer
                url={questionSet.audio?.key}
                text={questionSet.audio?.transcription}
            />

            <Questions questions={questionSet.questions} />

            <QuestionSetExplanation explanation={questionSet.explanation} />
        </div>
    )
}
