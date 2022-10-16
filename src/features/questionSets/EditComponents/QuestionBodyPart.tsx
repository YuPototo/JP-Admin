import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { createEmptyEditor } from '../../editor/CustomEditor'
import {
    questionBodyAdded,
    questionBodyChanged,
    questionBodyRemoved,
    selectHasQuestionBody,
} from '../questionSetEditorSlice'
import { RichTextNode } from '../questionSetTypes'
import RemovableEditor from './RemovableEditor'

type Props = {
    index: number
    initialValue?: RichTextNode[]
}

export default function QuestionBodyPart({
    index,
    initialValue = createEmptyEditor(),
}: Props) {
    const dispatch = useAppDispatch()

    const hasQuestionBody = useAppSelector(selectHasQuestionBody(index))

    const handleChange = (value: RichTextNode[]) => {
        dispatch(questionBodyChanged({ questionIndex: index, value }))
    }

    return (
        <div className="flex items-center gap-6">
            <div className="font-bold text-green-800">题干</div>

            {hasQuestionBody ? (
                <>
                    <div className="flex-grow">
                        <RemovableEditor
                            initalValue={initialValue}
                            onChange={handleChange}
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
