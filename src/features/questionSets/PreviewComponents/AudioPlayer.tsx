import React from 'react'

type Props = {
    url?: string
}

export default function AudioPlayer({ url }: Props) {
    if (!url) {
        return <></>
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="font-bold text-green-700">听力</div>
            <audio controls src={url}></audio>
        </div>
    )
}
