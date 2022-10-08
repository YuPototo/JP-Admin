import clsx from 'clsx'
import { RenderLeafProps } from 'slate-react'

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

export default Leaf
