import { useState } from 'react'
import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { createEmptyEditor } from '../../editor/CustomEditor'
import {
    questionExplanationAdded,
    questionExplanationChanged,
    questionExplanationRemoved,
    selectHasQuestionExplanation,
} from '../questionSetEditorSlice'
import { RichTextNode } from '../questionSetTypes'
import RemovableEditor from './RemovableEditor'

type Props = {
    questionIndex: number
    startingValue?: RichTextNode[]
}

export default function QuestionExpalantionPart({
    questionIndex,
    startingValue = createEmptyEditor(),
}: Props) {
    const [initialValue, setInitialValue] = useState(startingValue)

    const dispatch = useAppDispatch()

    const handleChange = (value: RichTextNode[]) => {
        dispatch(questionExplanationChanged({ questionIndex, value }))
    }

    const hasQuestionExplanation = useAppSelector(
        selectHasQuestionExplanation(questionIndex)
    )

    const handleAdd = () => {
        setInitialValue(createEmptyEditor())
        dispatch(questionExplanationAdded(questionIndex))
    }

    return (
        <div className="flex items-center gap-6">
            <div className="font-bold text-green-800">解析</div>

            {hasQuestionExplanation ? (
                <>
                    <div className="flex-grow">
                        <RemovableEditor
                            initalValue={initialValue}
                            onChange={handleChange}
                            onRemove={() =>
                                dispatch(
                                    questionExplanationRemoved(questionIndex)
                                )
                            }
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center gap-4">
                        <div className="color-gray-700 text-sm">
                            用于添加小题的解析。
                        </div>
                        <Button outline onClick={handleAdd}>
                            添加
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
