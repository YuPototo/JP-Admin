// Import the Slate editor factory.
import { useCallback, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import isHotkey from 'is-hotkey'

// Import the Slate components and React plugin.
import {
    Slate,
    Editable,
    withReact,
    RenderElementProps,
    RenderLeafProps,
} from 'slate-react'
import Toolbar, { toggleMark } from './Toolbar'
import areEqual from 'deep-equal'
import clsx from 'clsx'

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

    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
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

const DefaultElement = (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
}

const Leaf = (props: RenderLeafProps) => {
    return (
        <span
            {...props.attributes}
            // 这里直接使用了 renderer 的 className
            className={clsx({
                'jp-bold': props.leaf.bold,
                'jp-underline': props.leaf.underline,
            })}
        >
            {props.children}
        </span>
    )
}
