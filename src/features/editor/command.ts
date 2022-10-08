import { Editor, Text, Transforms } from 'slate'
import { EditorType } from './SlateEditor'
import { Element } from 'slate'

export const CustomEditor = {
    isBoldMarkActive(editor: EditorType) {
        const [match] = Editor.nodes(editor, {
            //@ts-ignore
            match: (node) => node.bold === true,
            universal: true,
        })

        return !!match
    },

    toggleBoldMark(editor: EditorType) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? undefined : true },
            { match: (n) => Text.isText(n), split: true }
        )
    },

    //@ts-ignore
    isUnderlineMarkActive(editor) {
        //@ts-ignore
        const [match] = Editor.nodes(editor, {
            //@ts-ignore
            match: (n) => n.underline === true,
            universal: true,
        })

        return !!match
    },

    //@ts-ignore
    toggleUnderlineMark(editor) {
        const isActive = CustomEditor.isUnderlineMarkActive(editor)
        Transforms.setNodes(
            editor,
            //@ts-ignore
            { underline: isActive ? undefined : true },
            { match: (n) => Text.isText(n), split: true }
        )
    },
}
