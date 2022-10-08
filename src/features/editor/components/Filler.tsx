import React, { ReactElement } from 'react'

type Props = {
    children: ReactElement
}
export default function Filler({ children }: Props): ReactElement {
    return (
        <span className="jp-filler" contentEditable={false}>
            <span className="hidden">{children}</span>
        </span>
    )
}
