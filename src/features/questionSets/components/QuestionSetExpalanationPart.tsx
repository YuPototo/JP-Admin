import React from 'react'
import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    questionSetExplanationAdded,
    questionSetExplanationRemoved,
    selectHasQuestionSetExplanation,
} from '../questionSetEditorSlice'
import RemovableEditor from './RemovableEditor'

export default function QuesitonSetExplanationPart() {
    const dispatch = useAppDispatch()
    const hasQuestionSetExplanation = useAppSelector(
        selectHasQuestionSetExplanation
    )

    return (
        <div className="rounded bg-gray-100 p-4">
            <div className="text-lg font-bold text-green-800">大题解析</div>

            {hasQuestionSetExplanation ? (
                <div className="mt-2">
                    <RemovableEditor
                        onRemove={() =>
                            dispatch(questionSetExplanationRemoved())
                        }
                    />
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <div className="color-gray-700 text-sm">用于大题解析。</div>
                    <Button
                        outline
                        onClick={() => dispatch(questionSetExplanationAdded())}
                    >
                        添加
                    </Button>
                </div>
            )}
        </div>
    )
}
