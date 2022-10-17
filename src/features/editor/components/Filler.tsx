import clsx from 'clsx'
import React, { ReactElement } from 'react'
import { RenderElementProps, useFocused, useSelected } from 'slate-react'

type Props = {
    attributes: RenderElementProps['attributes']
    children: RenderElementProps['children']
}
export default function Filler({ attributes, children }: Props): ReactElement {
    const selected = useSelected()
    const focused = useFocused()

    return (
        <span
            {...attributes}
            className={clsx('jp-filler', selected && focused && 'ring')}
            contentEditable={false}
        >
            <span className="hidden">{children}</span>
        </span>
    )
}
