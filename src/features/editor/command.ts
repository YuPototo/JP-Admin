import { Editor, Text, Transforms } from 'slate'

export const CustomEditor = {
    //@ts-ignore
    isBoldMarkActive(editor) {
        //@ts-ignore
        const [match] = Editor.nodes(editor, {
            //@ts-ignore
            match: (n) => n.bold === true,
            universal: true,
        })

        return !!match
    },

    //@ts-ignore
    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            //@ts-ignore
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
