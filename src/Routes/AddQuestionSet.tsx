import _ from 'lodash'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import AudioPart from '../features/questionSets/EditComponents/AudioPart'
import QuestionListPart from '../features/questionSets/EditComponents/QuestionListPart'
import QuestionSetBodyPart from '../features/questionSets/EditComponents/QuestionSetBodyPart'
import QuesitonSetExplanationPart from '../features/questionSets/EditComponents/QuestionSetExpalanationPart'
import Previewer from '../features/questionSets/PreviewComponents/Previewer'
import {
    chapterUsed,
    emptyQuestion,
    finishEditing,
    questionSetCreated,
} from '../features/questionSets/questionSetEditorSlice'
import { useAppDispatch } from '../store/hooks'

export default function AddQuestionSet() {
    let [searchParams] = useSearchParams()
    const chapterId = searchParams.get('chapterId')
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            dispatch(finishEditing())
        }
    }, [dispatch])

    useEffect(() => {
        if (chapterId) {
            dispatch(chapterUsed(chapterId))
            dispatch(questionSetCreated())
        }
    }, [dispatch, chapterId])

    const newQuestionSet = {
        questions: [_.cloneDeep(emptyQuestion)],
    }

    return (
        <PageLayout>
            <div className="text-xl text-white">新增题目</div>
            <div className="my-8 flex flex-col gap-5">
                {/* 新题目默认没有 questionSetBody */}
                <QuestionSetBodyPart />

                {/* Audio Editor 不是富文本编辑器 */}
                <AudioPart />

                <QuestionListPart initialValues={newQuestionSet.questions} />

                {/* 新题目默认没有 questionSetExplanation */}
                <QuesitonSetExplanationPart />

                <Previewer editType="new" />
            </div>
        </PageLayout>
    )
}
