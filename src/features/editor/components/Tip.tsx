import { ReactElement } from 'react'
import { TipElement } from '../editorTypes'

type Props = {
    element: TipElement
    children: ReactElement
}

export default function Tip({ element, children }: Props): ReactElement {
    return <span className="jp-tip">{children}</span>
}
