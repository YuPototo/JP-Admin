// Import the Slate editor factory.
import { useCallback, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import isHotkey from 'is-hotkey'
import {
    Slate,
    Editable,
    withReact,
    RenderElementProps,
    RenderLeafProps,
    DefaultElement as Paragraph,
} from 'slate-react'

import Toolbar, { toggleMark } from './components/Toolbar'
import Leaf from './components/Leaf'
import Filler from './components/Filler'
import Tip from './components/Tip'

export type EditorType = ReturnType<typeof withReact>

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+u': 'underline',
}

type Props = {
    value: Descendant[]
    onChange: (value: Descendant[]) => void
}

export default function SlateEditor({ onChange, value }: Props) {
    const [editor] = useState(() => withReact(createEditor()))

    useInlineConfig(editor)
    const renderElement = useRenderElement()
    const renderLeaf = useRenderLeaf()

    const handleChange = (newValue: Descendant[]) => {
        // 判断编辑器内容是否发生改变
        const isAstChange = editor.operations.some(
            (op) => 'set_selection' !== op.type
        )
        if (isAstChange) {
            onChange(newValue)
        }
    }

    return (
        <div>
            <Slate editor={editor} value={value} onChange={handleChange}>
                <Toolbar />

                <div className="rounded border border-gray-300 bg-gray-50 px-4 py-3 shadow-green-100">
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onKeyDown={(event) => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event as any)) {
                                    event.preventDefault()
                                    //@ts-ignore
                                    const mark = HOTKEYS[hotkey]
                                    toggleMark(editor, mark)
                                }
                            }
                        }}
                    />
                </div>
            </Slate>
        </div>
    )
}

function useRenderElement() {
    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            case 'filler':
                return <Filler {...props} />
            case 'tip':
                // tech debt：RenderElementProps 不包含 custom element 的 type
                //@ts-ignore
                return <Tip {...props} />
            case 'paragraph':
                return <Paragraph {...props} />
            default:
                return (
                    <div className="my-2">
                        <div className="text-sm text-red-700">未知数据类型</div>
                        <div className="text-sm text-red-700">
                            {JSON.stringify(props.element)}
                        </div>
                    </div>
                )
        }
    }, [])
    return renderElement
}

function useRenderLeaf() {
    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <Leaf {...props} />
    }, [])
    return renderLeaf
}

// 设置哪个 element 是 inline elmeent
function useInlineConfig(editor: EditorType) {
    editor.isInline = (element) => ['filler', 'tip'].includes(element.type)
    editor.isVoid = (element) => ['filler'].includes(element.type)
}
