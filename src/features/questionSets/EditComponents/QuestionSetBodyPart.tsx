import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    questionSetBodyAdded,
    questionSetBodyChanged,
    selectQuestionSetBody,
} from '../questionSetEditorSlice'
import { questionSetBodyRemoved } from '../questionSetEditorSlice'
import { RichTextNode } from '../questionSetTypes'
import RemovableEditor from './RemovableEditor'

export default function QuestionSetBodyPart() {
    const dispatch = useAppDispatch()
    const value = useAppSelector(selectQuestionSetBody)

    const handleChange = (value: RichTextNode[]) => {
        dispatch(questionSetBodyChanged(value))
    }

    return (
        <div className="rounded bg-gray-100 p-4">
            <div className="text-lg font-bold text-green-800">大题题干</div>

            {value !== undefined ? (
                <div className="mt-2">
                    <RemovableEditor
                        value={value}
                        onChange={handleChange}
                        onRemove={() => dispatch(questionSetBodyRemoved())}
                    />
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <div className="color-gray-700 text-sm">
                        用于有多个小题的题目，比如阅读题。这里可以添加阅读文段。
                    </div>
                    <Button
                        outline
                        onClick={() => dispatch(questionSetBodyAdded())}
                    >
                        添加
                    </Button>
                </div>
            )}
        </div>
    )
}
