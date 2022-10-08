// Import the Slate editor factory.
import { useCallback, useState } from 'react'
import { createEditor, Descendant, BaseRange } from 'slate'
import { CustomEditor } from './command'

// Import the Slate components and React plugin.
import {
    Slate,
    Editable,
    withReact,
    RenderElementProps,
    RenderLeafProps,
} from 'slate-react'
import Toolbar from './Toolbar'
import areEqual from 'deep-equal'

export type EditorType = ReturnType<typeof withReact>

type Props = {
    value: Descendant[]
    onChange: (value: Descendant[]) => void
}

export default function SlateEditor({ onChange, value }: Props) {
    const [editor] = useState(() => withReact(createEditor()))
    const [selection, setSelection] = useSelection(editor)

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
        setSelection(editor.selection) // 用于触发 selection 变化，以让 ToolBar 重新 render

        // 过滤掉这些事件
        if (areEqual(newValue, value)) return
        onChange(newValue)
    }

    return (
        <div>
            <Slate editor={editor} value={value} onChange={handleChange}>
                <Toolbar
                    selection={selection}
                    customEditor={CustomEditor}
                    editor={editor}
                />
                <div className="rounded border border-gray-300 bg-gray-50 px-6 py-3 shadow-green-100">
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                    />
                </div>
            </Slate>
        </div>
    )
}

function useSelection(editor: EditorType) {
    const [selection, setSelection] = useState(editor.selection)

    const setSelectionOptimized = useCallback(
        (newSelection: BaseRange | null) => {
            if (areEqual(selection, newSelection)) {
                return
            }
            setSelection(newSelection)
        },
        [setSelection, selection]
    )

    return [selection, setSelectionOptimized] as const
}

const DefaultElement = (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
}

const Leaf = (props: RenderLeafProps) => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
            {props.children}
        </span>
    )
}
