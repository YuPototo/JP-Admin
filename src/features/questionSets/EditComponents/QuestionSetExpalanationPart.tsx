import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { createEmptyEditor } from '../../editor/CustomEditor'
import {
    questionSetExplanationAdded,
    questionSetExplanationRemoved,
    questionSetExplanationChanged,
    selectHasQuestionSetExplanation,
} from '../questionSetEditorSlice'
import { RichTextNode } from '../questionSetTypes'
import RemovableEditor from './RemovableEditor'

type Props = {
    initialValue?: RichTextNode[]
}
export default function QuesitonSetExplanationPart({
    initialValue = createEmptyEditor(),
}: Props) {
    const dispatch = useAppDispatch()

    const handleChange = (value: RichTextNode[]) => {
        dispatch(questionSetExplanationChanged(value))
    }

    const hasQuestionSetExplanation = useAppSelector(
        selectHasQuestionSetExplanation
    )

    return (
        <div className="rounded bg-gray-100 p-4">
            <div className="text-lg font-bold text-green-800">大题解析</div>

            {hasQuestionSetExplanation ? (
                <div className="mt-2">
                    <RemovableEditor
                        initalValue={initialValue}
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
