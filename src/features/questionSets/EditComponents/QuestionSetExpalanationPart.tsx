import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    questionSetExplanationAdded,
    questionSetExplanationRemoved,
    selectQuestionSetExplanation,
    questionSetExplanationChanged,
} from '../questionSetEditorSlice'
import { RichTextNode } from '../questionSetTypes'
import RemovableEditorSlate from './RemovableEditorSlate'

export default function QuesitonSetExplanationPart() {
    const dispatch = useAppDispatch()

    const explanation = useAppSelector(selectQuestionSetExplanation)

    const handleChange = (value: RichTextNode[]) => {
        dispatch(questionSetExplanationChanged(value))
    }

    return (
        <div className="rounded bg-gray-100 p-4">
            <div className="text-lg font-bold text-green-800">大题解析</div>

            {explanation ? (
                <div className="mt-2">
                    <RemovableEditorSlate
                        value={explanation}
                        onChange={handleChange}
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
