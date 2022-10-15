import React from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { FillerElement } from '../editorTypes'
import { EditorType } from '../SlateEditor'
import ToolbarButton from './ToolbarButton'

export default function InsertFillerButton() {
    const editor = useSlateStatic()

    return (
        <ToolbarButton
            onMouseDown={(event) => {
                event.preventDefault()
                insertFiller(editor)
            }}
        >
            <span className="text-sm">{'<>'}</span>
        </ToolbarButton>
    )
}

const insertFiller = (editor: EditorType) => {
    ReactEditor.focus(editor)

    const filler: FillerElement = {
        type: 'filler',
        children: [{ text: '&nbsp;' }],
    }
    Transforms.insertNodes(editor, filler)
}
