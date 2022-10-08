import Button from '../../../components/ui/Button'
import SlateEditor from '../../editor/SlateEditor'
import { Descendant } from 'slate'

type Props = {
    value: Descendant[]
    disableRemove?: boolean
    onRemove: () => void
    onChange: (value: Descendant[]) => void
}

export default function RemovableEditorSlate({
    value,
    onRemove,
    onChange,
    disableRemove = false,
}: Props) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex-grow">
                <SlateEditor value={value} onChange={onChange} />
            </div>
            <div className="">
                <Button
                    outline
                    color="gray"
                    onClick={onRemove}
                    disabled={disableRemove}
                >
                    移除
                </Button>
            </div>
        </div>
    )
}
