import { Editor, Node, Path, Range, Transforms, Element } from 'slate'
import { emptyParagraph } from '../CustomEditor'

//https://github.com/ianstormtaylor/slate/issues/3991
export const withCorrectVoidBehavior = <T extends Editor>(editor: T) => {
    const { deleteBackward, insertBreak } = editor

    // if current selection is void node, insert a default node below
    editor.insertBreak = () => {
        if (!editor.selection || !Range.isCollapsed(editor.selection)) {
            return insertBreak()
        }

        const selectedNodePath = Path.parent(editor.selection.anchor.path)
        const selectedNode = Node.get(editor, selectedNodePath)
        if (Editor.isVoid(editor, selectedNode)) {
            Editor.insertNode(editor, {
                type: 'paragraph',
                children: [{ text: '' }],
            })
            return
        }

        insertBreak()
    }

    // if prev node is a void node, remove the current node and select the void node
    editor.deleteBackward = (unit) => {
        if (
            !editor.selection ||
            !Range.isCollapsed(editor.selection) ||
            editor.selection.anchor.offset !== 0
        ) {
            return deleteBackward(unit)
        }

        const parentPath = Path.parent(editor.selection.anchor.path)
        const parentNode = Node.get(editor, parentPath)
        const parentIsEmpty = Node.string(parentNode).length === 0

        if (parentIsEmpty && Path.hasPrevious(parentPath)) {
            const prevNodePath = Path.previous(parentPath)
            const prevNode = Node.get(editor, prevNodePath)
            if (Editor.isVoid(editor, prevNode)) {
                return Transforms.removeNodes(editor)
            }
        }

        deleteBackward(unit)

        // add an empty paragraph if there no element left
        const [match] = Editor.nodes(editor, {
            match: (n) => Element.isElement(n),
        })
        if (!match) {
            Transforms.insertNodes(editor, emptyParagraph)
        }
    }

    return editor
}
