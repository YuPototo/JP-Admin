import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    optionRemoved,
    optionSelected,
    selectAnswer,
    selectOptionsCount,
} from '../questionSetEditorSlice'
import RemovableEditor from './RemovableEditor'
import { Check } from 'react-bootstrap-icons'
import clsx from 'clsx'

type Props = {
    questionIndex: number
    optionIndex: number
}

export default function OptionPart({ questionIndex, optionIndex }: Props) {
    const dispatch = useAppDispatch()
    const optionCount = useAppSelector(selectOptionsCount(questionIndex))
    const isSelected = useAppSelector(selectAnswer(questionIndex, optionIndex))

    const handleClick = () => {
        dispatch(optionSelected({ questionIndex, optionIndex }))
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
            <div className="flex-grow">
                <RemovableEditor
                    onRemove={() =>
                        dispatch(optionRemoved({ questionIndex, optionIndex }))
                    }
                    disableRemove={optionCount <= 2}
                />
            </div>
        </div>
    )
}
