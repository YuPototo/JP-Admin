import clsx from 'clsx'

// ! tech debts
export default function Toolbar({ selection, customEditor, editor }: any) {
    return (
        <div className="mb-1 flex gap-1">
            <button
                className={clsx('w-6 rounded bg-white p-1', {
                    'bg-green-300': customEditor.isBoldMarkActive(editor),
                })}
                onClick={() => customEditor.toggleBoldMark(editor)}
            >
                b
            </button>
        </div>
    )
}
