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
    DefaultElement,
} from 'slate-react'
import areEqual from 'deep-equal'

import Toolbar, { toggleMark } from './components/Toolbar'
import Leaf from './components/Leaf'
import Filler from './components/Filler'

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

    // 设置 inline 和 void element 类型
    editor.isInline = (element) => ['filler', 'tip'].includes(element.type)
    editor.isVoid = (element) => ['filler'].includes(element.type)

    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            case 'filler':
                return <Filler {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <Leaf {...props} />
    }, [])

    const handleChange = (newValue: Descendant[]) => {
        // 过滤掉这些事件
        if (areEqual(newValue, value)) return
        onChange(newValue)
    }

    return (
        <div>
            <Slate editor={editor} value={value} onChange={handleChange}>
                <Toolbar />
                <div className="rounded border border-gray-300 bg-gray-50 px-6 py-3 shadow-green-100">
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
