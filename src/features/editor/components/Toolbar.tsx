import { Editor } from 'slate'
import { useSlate } from 'slate-react'
import ToolbarButton from './ToolbarButton'
import { EditorType } from '../SlateEditor'
import { TypeBold, TypeUnderline } from 'react-bootstrap-icons'
import InsertFillerButton from './InsertFillerButton'

type Format = 'bold' | 'underline'

export default function MyToolbar() {
    return (
        <div className="mb-1 flex items-center gap-1">
            <MarkButton format="bold">
                <TypeBold />
            </MarkButton>
            <MarkButton format="underline">
                <TypeUnderline />
            </MarkButton>
            <InsertFillerButton />
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

export const toggleMark = (editor: EditorType, format: Format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}
