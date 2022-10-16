import { useState } from 'react'
import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { createEmptyEditor } from '../../editor/CustomEditor'
import {
    questionSetBodyAdded,
    questionSetBodyChanged,
    selectHasQuestionSetBody,
} from '../questionSetEditorSlice'
import { questionSetBodyRemoved } from '../questionSetEditorSlice'
import { RichTextNode } from '../questionSetTypes'
import RemovableEditor from './RemovableEditor'

type Props = {
    startingValue?: RichTextNode[] // 初次渲染时的值
}

export default function QuestionSetBodyPart({
    startingValue = createEmptyEditor(),
}: Props) {
    // 如果使用添加按钮，initialValue 应该是个空白值
    const [initialValue, setInitialValue] = useState(startingValue)

    const dispatch = useAppDispatch()

    const hasQuestionSetBody = useAppSelector(selectHasQuestionSetBody)

    const handleChange = (value: RichTextNode[]) => {
        dispatch(questionSetBodyChanged(value))
    }

    const handleAdd = () => {
        setInitialValue(createEmptyEditor())
        dispatch(questionSetBodyAdded())
    }

    return (
        <div className="rounded bg-gray-100 p-4">
            <div className="text-lg font-bold text-green-800">大题题干</div>

            {hasQuestionSetBody ? (
                <div className="mt-2">
                    <RemovableEditor
                        initalValue={initialValue}
                        onChange={handleChange}
                        onRemove={() => dispatch(questionSetBodyRemoved())}
                    />
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <div className="color-gray-700 text-sm">
                        用于有多个小题的题目，比如阅读题。这里可以添加阅读文段。
                    </div>
                    <Button outline onClick={handleAdd}>
                        添加
                    </Button>
                </div>
            )}
        </div>
    )
}
