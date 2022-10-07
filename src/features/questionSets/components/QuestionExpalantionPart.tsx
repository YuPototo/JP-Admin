import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    questionExplanationAdded,
    questionExplanationChanged,
    questionExplanationRemoved,
    selectHasQuestionExaplantion,
    selectQuestionExplanation,
} from '../questionSetEditorSlice'
import RemovableEditor from './RemovableEditor'

type Props = {
    questionIndex: number
}

export default function QuestionExpalantionPart({ questionIndex }: Props) {
    const dispatch = useAppDispatch()

    const hasQuestionExplanation = useAppSelector(
        selectHasQuestionExaplantion(questionIndex)
    )

    const value = useAppSelector(selectQuestionExplanation(questionIndex))

    const handleChange = (value: string) => {
        dispatch(questionExplanationChanged({ questionIndex, value }))
    }

    return (
        <div className="flex items-center gap-6">
            <div className="font-bold text-green-800">解析</div>

            {hasQuestionExplanation ? (
                <>
                    <div className="flex-grow">
                        <RemovableEditor
                            value={value}
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
                        <Button
                            outline
                            onClick={() =>
                                dispatch(
                                    questionExplanationAdded(questionIndex)
                                )
                            }
                        >
                            添加
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
