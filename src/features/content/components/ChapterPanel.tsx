import React from 'react'
import Button from '../../../components/ui/Button'
import Skeleton from '../../../components/ui/Skeleton'
import { useGetChapterQuery } from '../../questionSets/questionSetService'
import ChapterEditor from './ChapterEditor'
import { IChapter } from '../contentTypes'

type Props = {
    chapter: IChapter
}

export default function ChapterPanel({ chapter }: Props) {
    const { data, isLoading } = useGetChapterQuery(chapter.id)

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
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <div className=" ">{data?.desc || '无'}</div>
                    )}
                </div>
            </div>

            {isLoading || (
                <div className="ml-auto flex gap-4">
                    <ChapterEditor chapter={chapter} />
                    <Button outline color="red">
                        隐藏
                    </Button>
                </div>
            )}
        </div>
    )
}
