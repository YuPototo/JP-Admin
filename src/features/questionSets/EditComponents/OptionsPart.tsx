import { useState } from 'react'
import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    createNewOption,
    optionAdded,
    selectOptions,
} from '../questionSetEditorSlice'
import { WorkingOption } from '../questionSetTypes'
import OptionPart from './OptionPart'

type Props = {
    questionIndex: number
    startingValue: WorkingOption[]
}

export default function OptionsPart({ questionIndex, startingValue }: Props) {
    const [initialValue, setInitialValue] = useState(startingValue)

    const dispatch = useAppDispatch()
    const options = useAppSelector(selectOptions(questionIndex))

    const handleAdd = () => {
        setInitialValue([...options!, createNewOption()])
        dispatch(optionAdded(questionIndex))
    }

    return (
        <div className="flex items-center gap-6">
            <div className="font-bold text-green-800">选项</div>
            <div className="flex flex-grow flex-col gap-5">
                {options &&
                    options.map((option, index) => (
                        <OptionPart
                            key={option.uuid}
                            questionIndex={questionIndex}
                            optionIndex={index}
                            initialValue={initialValue[index].data}
                        />
                    ))}

                <div>
                    <Button outline onClick={handleAdd}>
                        新增选项
                    </Button>
                </div>
            </div>
        </div>
    )
}
