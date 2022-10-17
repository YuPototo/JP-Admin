import { ReactElement } from 'react'
import { RenderElementProps } from 'slate-react'
import { TipElement } from '../editorTypes'

type Props = {
    attributes: RenderElementProps['attributes']
    element: TipElement
    children: RenderElementProps['children']
}

export default function Tip({
    attributes,
    element,
    children,
}: Props): ReactElement {
    return (
        <span {...attributes} className="jp-tip">
            {children}
            <span className="jp-tip-content" contentEditable={false}>
                <span>{element.tip}</span>
            </span>
        </span>
    )
}
