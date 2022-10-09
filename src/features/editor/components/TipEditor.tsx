import { useEffect } from 'react'
import { useState } from 'react'
import { useSlate } from 'slate-react'
import Button from '../../../components/ui/Button'
import { CustomEditor } from '../CustomEditor'

export default function TipEditor() {
    const [value, setValue] = useState<string>('')

    const editor = useSlate()

    const tip = CustomEditor.getTip(editor)

    useEffect(() => {
        if (tip) {
            setValue(tip)
        }
    }, [tip])

    const handleConfirm = () => {
        CustomEditor.setTip(editor, value)
    }

    const handleDelete = () => {
        CustomEditor.unsetTip(editor)
    }

    return (
        <div className="flex items-center gap-2 rounded bg-gray-300 p-2">
            <label>发音</label>
            <input
                className="p-1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <Button outline onClick={handleConfirm} padding="py-1 px-2">
                确认
            </Button>
            <Button
                outline
                color="gray"
                onClick={handleDelete}
                padding="py-1 px-2"
            >
                移除
            </Button>
        </div>
    )
}
