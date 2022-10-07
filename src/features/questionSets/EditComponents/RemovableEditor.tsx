import React from 'react'
import RichTextEditor from '../../../components/RichTextEditor'
import Button from '../../../components/ui/Button'

type Props = {
    value: string
    disableRemove?: boolean
    onRemove: () => void
    onChange: (value: string) => void
}

export default function RemovableEditor({
    value,
    onRemove,
    onChange,
    disableRemove = false,
}: Props) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex-grow">
                <RichTextEditor value={value} onChange={onChange} />
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
