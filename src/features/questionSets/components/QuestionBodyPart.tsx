import React from 'react'
import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    questionBodyAdded,
    questionBodyRemoved,
    selectHasQuestionSetBody,
} from '../questionSetEditorSlice'
import RemovableEditor from './RemovableEditor'

type Props = {
    index: number
}

export default function QuestionBodyPart({ index }: Props) {
    const dispatch = useAppDispatch()
    const hasQuestionBody = useAppSelector(selectHasQuestionSetBody(index))

    return (
        <div className="flex items-center gap-6">
            <div className="font-bold text-green-800">题干</div>

            {hasQuestionBody ? (
                <>
                    <div className="flex-grow">
                        <RemovableEditor
                            onRemove={() =>
                                dispatch(questionBodyRemoved(index))
                            }
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center gap-4">
                        <div className="color-gray-700 text-sm">
                            用于添加小题的题目。
                        </div>
                        <Button
                            outline
                            onClick={() => dispatch(questionBodyAdded(index))}
                        >
                            添加
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
