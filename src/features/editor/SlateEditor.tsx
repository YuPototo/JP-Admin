// Import the Slate editor factory.
import _ from 'lodash'
import { useCallback, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { CustomEditor } from './command'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import Toolbar from './Toolbar'
import areEqual from 'deep-equal'

type Props = {
    value: Descendant[]
    onChange: (value: Descendant[]) => void
}

export default function SlateEditor({ onChange, value }: Props) {
    const [editor] = useState(() => withReact(createEditor()))
    const [selection, setSelection] = useSelection(editor)

    //@ts-ignore
    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    //@ts-ignore
    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />
    }, [])

    const handleChange = (newValue: Descendant[]) => {
        setSelection(editor.selection) // 用于触发 selection 变化，以让 ToolBar 重新 render

        // “选中”和光标的改变也会触发 onChange 事件，这里需要过滤掉这些事件
        if (_.isEqual(newValue, value)) return
        onChange(newValue)
    }

    return (
        <div>
            <Toolbar
                selection={selection}
                customEditor={CustomEditor}
                editor={editor}
            />
            <div className="rounded border border-gray-300 bg-gray-50 px-6 py-3 shadow-green-100">
                <Slate editor={editor} value={value} onChange={handleChange}>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                    />
                </Slate>
            </div>
        </div>
    )
}

function useSelection(editor: any) {
    const [selection, setSelection] = useState(editor.selection)
    const setSelectionOptimized = useCallback(
        (newSelection: any) => {
            // don't update the component state if selection hasn't changed.
            if (areEqual(selection, newSelection)) {
                return
            }
            setSelection(newSelection)
        },
        [setSelection, selection]
    )

    return [selection, setSelectionOptimized]
}

//@ts-ignore
const DefaultElement = (props) => {
    return (
        <p
            {...props.attributes}
            style={{ fontWeight: props.leaf?.bold ? 'bold' : 'normal' }}
        >
            {props.children}
        </p>
    )
}

//@ts-ignore
const Leaf = (props) => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
            {props.children}
        </span>
    )
}
