import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    optionChanged,
    optionRemoved,
    optionSelected,
    selectAnswer,
    selectOptionsCount,
    selectOptionValue,
} from '../questionSetEditorSlice'
import { Check } from 'react-bootstrap-icons'
import clsx from 'clsx'
import RemovableEditor from './RemovableEditor'
import { RichTextNode } from '../questionSetTypes'

type Props = {
    questionIndex: number
    optionIndex: number
}

export default function OptionPart({ questionIndex, optionIndex }: Props) {
    const dispatch = useAppDispatch()
    const value = useAppSelector(selectOptionValue(questionIndex, optionIndex))
    const optionCount = useAppSelector(selectOptionsCount(questionIndex))
    const isSelected = useAppSelector(selectAnswer(questionIndex, optionIndex))

    const handleClick = () => {
        dispatch(optionSelected({ questionIndex, optionIndex }))
    }
    const handleChange = (value: RichTextNode[]) => {
        dispatch(optionChanged({ questionIndex, optionIndex, value }))
    }

    return (
        <div className="flex items-center gap-4">
            <div
                className={clsx(
                    'rounded border bg-white hover:cursor-pointer hover:bg-green-300 ',
                    isSelected ? 'bg-green-200' : 'bg-white'
                )}
                onClick={handleClick}
            >
                <Check
                    className={clsx(
                        'hover:text-green-800',
                        isSelected ? 'text-green-700' : 'text-gray-300'
                    )}
                    size={30}
                />
            </div>
            {value && (
                <div className="flex-grow">
                    <RemovableEditor
                        value={value}
                        onRemove={() =>
                            dispatch(
                                optionRemoved({ questionIndex, optionIndex })
                            )
                        }
                        disableRemove={optionCount <= 2}
                        onChange={handleChange}
                    />
                </div>
            )}
        </div>
    )
}
