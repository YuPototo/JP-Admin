import { EditorType } from '../SlateEditor'

/**
 * Tech debt
 * 如何在 plugin 里 render 图片呢？
 */
const withImage = (editor: EditorType) => {
    const { isVoid } = editor

    editor.isVoid = (element) => {
        return element.type === 'image' ? true : isVoid(element)
    }

    return editor
}

export default withImage
