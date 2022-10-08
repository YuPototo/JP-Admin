import { ReactElement } from 'react'

// 在编辑器里展示的 tip，估计要改一改。
// 实现 link 那样的 inline 编辑。

export default function Tip({ element, children }: any): ReactElement {
    return (
        <span className="jp-tip">
            {children}
            <span className="jp-tip-content" contentEditable={false}>
                <span>{element.tip}</span>
            </span>
        </span>
    )
}
