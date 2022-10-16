import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    optionChanged,
    optionRemoved,
    optionSelected,
    selectIsSelected,
    selectOptionsCount,
} from '../questionSetEditorSlice'
import { Check } from 'react-bootstrap-icons'
import clsx from 'clsx'
import RemovableEditor from './RemovableEditor'
import { RichTextNode } from '../questionSetTypes'
import { createEmptyEditor } from '../../editor/CustomEditor'

type Props = {
    questionIndex: number
    optionIndex: number
    initialValue?: RichTextNode[]
}

export default function OptionPart({
    questionIndex,
    optionIndex,
    initialValue = createEmptyEditor(),
}: Props) {
    const dispatch = useAppDispatch()
    const optionCount = useAppSelector(selectOptionsCount(questionIndex))
    const isSelected = useAppSelector(
        selectIsSelected(questionIndex, optionIndex)
    )

    const handleClick = () => {
        dispatch(optionSelected({ questionIndex, optionIndex }))
    }
    const handleChange = (value: RichTextNode[]) => {
        dispatch(optionChanged({ questionIndex, optionIndex, value }))
    }

    return (
        <div
            className={clsx(
                'flex items-center gap-4 p-2',
                isSelected && 'bg-green-100'
            )}
        >
            <div
                className={clsx(
                    'rounded border bg-white p-1 hover:cursor-pointer hover:bg-green-300 ',
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
                    initalValue={initialValue}
                    onRemove={() =>
                        dispatch(optionRemoved({ questionIndex, optionIndex }))
                    }
                    disableRemove={optionCount <= 2}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
