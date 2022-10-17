import { Editor, Element, Transforms, Path } from 'slate'
import { EditorType } from './SlateEditor'
import { ReactEditor } from 'slate-react'
import _ from 'lodash'
import { RichTextNode } from '../questionSets/questionSetTypes'
import { ImageElement } from './editorTypes'

/**
 * Use custom editor to add custom methods to the editor
 * https://docs.slatejs.org/concepts/08-plugins#helper-functions
 */

export const CustomEditor = {
    ...Editor,

    // 确认当前的 selection 是否是 tip 类型
    isTipActive(editor: EditorType) {
        if (editor.selection == null) {
            return false
        }

        const [match] = Editor.nodes(editor, {
            at: editor.selection,
            match: (n) => Element.isElement(n) && n.type === 'tip',
        })

        return !!match
    },

    // 新增一个 tip
    addTip(editor: EditorType) {
        // 如果没有选中文字，不允许添加
        if (editor.selection == null) {
            return false
        }

        Transforms.wrapNodes(
            editor,
            { type: 'tip', tip: '', children: [{ text: '' }] },
            { split: true, at: editor.selection }
        )
    },

    // 获取假名备注的 tip
    getTip(editor: EditorType) {
        const result = Editor.above(editor, {
            match: (n) => Element.isElement(n) && n.type === 'tip',
        })
        // 上面的 match 方法已经确认是 tip 类型了
        //@ts-ignore
        return result && result.length > 0 && result[0].tip
    },

    // 设置假名备注的 tip
    setTip(editor: EditorType, value: string) {
        const selection = editor.selection

        if (!selection) {
            return
        }

        const currentPath = selection?.anchor.path
        const parentPath = currentPath.filter(
            (_, i) => i !== currentPath.length - 1
        )
        if (value) {
            Transforms.setNodes(editor, { tip: value }, { at: parentPath })
        } else {
            // 如果没有需要设置的值，就 unwrap tip （把 tip 变为 text）
            this.unsetTip(editor)
        }
        ReactEditor.deselect(editor)
    },

    unsetTip(editor: EditorType) {
        Transforms.unwrapNodes(editor, {
            match: (n) => Element.isElement(n) && n.type === 'tip',
        })
    },

    // delete image
    deleteImage(editor: EditorType) {
        const selection = editor.selection

        if (!selection) {
            console.error('no selection')
            return
        }

        const currentPath = selection?.anchor.path
        const parentPath = currentPath.filter(
            (_, i) => i !== currentPath.length - 1
        )
        Transforms.removeNodes(editor, { at: parentPath })

        // add an empty paragraph if there no element left
        const [match] = Editor.nodes(editor, {
            match: (n) => Element.isElement(n),
        })
        if (!match) {
            Transforms.insertNodes(editor, emptyParagraph)
        }
    },

    // insert image
    insertImage(editor: EditorType, src: string, alt: string) {
        const selection = editor.selection

        const image: ImageElement = {
            type: 'image',
            src,
            alt,
            children: [{ text: '' }],
        }

        ReactEditor.focus(editor)

        // 如果没有 selection，就插入在最后
        if (!selection) {
            console.log('insert image at the end')
            Transforms.insertNodes(editor, image, { select: true })
            return
        }

        const [match] = Editor.nodes(editor, {
            at: selection,
            match: (n) =>
                Element.isElement(n) &&
                n.type === 'paragraph' &&
                n.children[0].text === '',
        })

        if (match) {
            // 如果 selection 所在的 node 是个 empty paragraph，就 replace
            console.log('replace empty paragraph')
            Transforms.setNodes(editor, image, { at: selection })
        } else {
            // 如果 selection 所在的 node 不是个 empty paragraph，就在下一个 root path 插入
            const parent = Editor.parent(editor, selection.focus?.path)
            const parentPath = parent[1]

            Transforms.insertNodes(editor, image, {
                select: true,
                at: Path.next(parentPath),
            })
        }
    },
}

export const emptyParagraph: RichTextNode = {
    type: 'paragraph',
    children: [{ text: '' }],
}

export function createEmptyEditor() {
    return [_.cloneDeep(emptyParagraph)]
}
