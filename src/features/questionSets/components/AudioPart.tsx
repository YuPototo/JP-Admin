import React from 'react'
import Button from '../../../components/ui/Button'

export default function AudioPart() {
    return (
        <div className="rounded bg-gray-100 p-4">
            <div className="text-lg font-bold text-green-800">音频</div>
            <div className="flex items-center gap-4">
                <div className="color-gray-700 text-sm">
                    每个大题可以添加一个音频。一般用于听力题。
                </div>
                <Button
                    outline
                    // onClick={() => dispatch(questionSetBodyAdded())}
                >
                    添加 todo
                </Button>
            </div>
        </div>
    )
}
