import { useSlate } from 'slate-react'
import { CustomEditor } from '../CustomEditor'
import ToolbarButton from './ToolbarButton'
import { Range } from 'slate'
import TipEditor from './TipEditor'

export default function InsertTipButton() {
    const editor = useSlate()

    const isActive = CustomEditor.isTipActive(editor)

    const disabled =
        editor.selection === null || // 没有任何 selection
        Range.isCollapsed(editor.selection) || // selection 是 collapsed，即一个光标
        isActive // 如果已经是 tip，就不再插入 tip

    const handleClick = () => {
        if (disabled) {
            return
        }
        CustomEditor.addTip(editor)
    }

    return (
        <>
            {CustomEditor.isTipActive(editor) && <TipEditor />}
            <ToolbarButton
                active={isActive}
                disabled={disabled}
                onMouseDown={handleClick}
            >
                <div>あ</div>
            </ToolbarButton>
        </>
    )
}
