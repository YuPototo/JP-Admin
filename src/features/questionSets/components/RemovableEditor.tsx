import React from 'react'
import RichTextEditor from '../../../components/RichTextEditor'
import Button from '../../../components/ui/Button'

type Props = {
    disableRemove?: boolean
    onRemove: () => void
}

export default function RemovableEditor({
    onRemove,
    disableRemove = false,
}: Props) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex-grow">
                <RichTextEditor />
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
