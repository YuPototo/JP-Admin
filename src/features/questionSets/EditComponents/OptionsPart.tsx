import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { optionAdded, selectOptions } from '../questionSetEditorSlice'
import OptionPart from './OptionPart'

type Props = {
    questionIndex: number
    initialValue: any
}

export default function OptionsPart({ questionIndex, initialValue }: Props) {
    const dispatch = useAppDispatch()
    const options = useAppSelector(selectOptions(questionIndex))

    return (
        <div className="flex items-center gap-6">
            <div className="font-bold text-green-800">选项</div>
            <div className="flex flex-grow flex-col gap-5">
                {options &&
                    options.map((option, index) => (
                        <OptionPart
                            key={Math.random()}
                            questionIndex={questionIndex}
                            optionIndex={index}
                            initialValue={initialValue[index]}
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
