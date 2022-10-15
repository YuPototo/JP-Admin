import clsx from 'clsx'
import React, { ReactElement } from 'react'
import { useFocused, useSelected } from 'slate-react'

type Props = {
    children: ReactElement
}
export default function Filler({ children }: Props): ReactElement {
    const selected = useSelected()
    const focused = useFocused()

    return (
        <span
            className={clsx('jp-filler', selected && focused && 'ring')}
            contentEditable={false}
        >
            <span className="hidden">{children}</span>
        </span>
    )
}
