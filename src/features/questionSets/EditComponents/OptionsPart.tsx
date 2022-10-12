import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { optionAdded, selectOptionsCount } from '../questionSetEditorSlice'
import OptionPart from './OptionPart'

type Props = {
    questionIndex: number
}

export default function OptionsPart({ questionIndex }: Props) {
    const dispatch = useAppDispatch()
    const optionCount = useAppSelector(selectOptionsCount(questionIndex))

    return (
        <div className="flex items-center gap-6">
            <div className="font-bold text-green-800">选项</div>
            <div className="flex flex-grow flex-col gap-5">
                {Array.from({ length: optionCount }).map((_, index) => (
                    <OptionPart
                        key={index}
                        questionIndex={questionIndex}
                        optionIndex={index}
                    />
                ))}

                <div>
                    <Button
                        outline
                        onClick={() => dispatch(optionAdded(questionIndex))}
                    >
                        新增选项
                    </Button>
                </div>
            </div>
        </div>
    )
}
