import Button from '../../../components/ui/Button'
import SlateEditor from '../../editor/SlateEditor'
import { RichTextNode } from '../questionSetTypes'

type Props = {
    initalValue: RichTextNode[]
    disableRemove?: boolean
    onRemove: () => void
    onChange: (value: RichTextNode[]) => void
}

export default function RemovableEditorSlate({
    initalValue,
    onRemove,
    onChange,
    disableRemove = false,
}: Props) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex-grow">
                <SlateEditor initalValue={initalValue} onChange={onChange} />
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
