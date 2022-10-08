import { BaseRange, Editor } from 'slate'
import { useSlate } from 'slate-react'
import { CustomEditor } from './command'
import ToolbarButton from './components/ToolbarButton'
import { EditorType } from './SlateEditor'
import { TypeBold } from 'react-bootstrap-icons'

type Format = 'bold'

type Props = {
    selection: BaseRange | null
    customEditor: typeof CustomEditor
    editor: EditorType
}

export default function MyToolbar({ selection, customEditor, editor }: Props) {
    return (
        <div className="mb-1 flex gap-1">
            <MarkButton format="bold">
                <TypeBold />
            </MarkButton>
        </div>
    )
}

/*  MarkButton */
type MarkButtonType = {
    format: Format
    children: React.ReactNode
}

const MarkButton = ({ format, children }: MarkButtonType) => {
    const editor = useSlate()
    return (
        <ToolbarButton
            active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            {children}
        </ToolbarButton>
    )
}

const isMarkActive = (editor: EditorType, format: Format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const toggleMark = (editor: EditorType, format: Format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}
