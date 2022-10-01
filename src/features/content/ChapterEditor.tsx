import React from 'react'
import Button from '../../components/ui/Button'
import { useGetChapterQuery } from '../questionSets/questionSetService'
import { IChapter } from './contentTypes'

type Props = {
    chapter: IChapter
}

export default function ChapterEditor({ chapter }: Props) {
    const { data } = useGetChapterQuery(chapter.id)

    return (
        <div className="flex items-center rounded bg-white px-4 py-3">
            <div>
                <div className="font-bold text-green-700 ">{chapter.title}</div>
                <div className="mb-2 flex items-center gap-4">
                    <label className="text-gray-500">id</label>
                    <div className="text-sm text-gray-500">{chapter.id}</div>
                </div>
                <div className="mb-2 flex items-center gap-4">
                    <label className="text-gray-500">小节说明</label>
                    <div className=" ">{data?.desc || '无'}</div>
                </div>
            </div>
            <div className="ml-auto flex gap-4">
                <Button outline color="gray">
                    编辑
                </Button>
                <Button outline color="red">
                    隐藏
                </Button>
            </div>
        </div>
    )
}
