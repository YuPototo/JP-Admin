import clsx from 'clsx'
import { Link, useParams } from 'react-router-dom'
import Chapters from './Chapters'
import { ISection } from '../contentTypes'
import ChapterAdder from './ChapterAdder'

type Props = {
    section: ISection
    sectionIndex: number

    isActive?: boolean
}

export default function Section({
    section,
    sectionIndex,
    isActive = false,
}: Props) {
    const { bookId, chapterIndex } = useParams() as {
        bookId: string
        chapterIndex: string
    }

    return (
        <div>
            <Link
                to={`/bookEditor/${bookId}/sectionIndex/${sectionIndex}/chapterIndex/0`}
            >
                <div
                    className={clsx(
                        'my-1 rounded bg-gray-200 p-2 hover:bg-yellow-300 ',
                        { 'bg-yellow-200': isActive }
                    )}
                >
                    {section.title}
                </div>
            </Link>
            {isActive && (
                <div className="mb-10 flex flex-col ">
                    {section.chapters.length === 0 ? (
                        <div className="pl-5 text-sm text-gray-700">
                            暂无小节
                        </div>
                    ) : (
                        <Chapters
                            chapters={section.chapters}
                            chapterIndex={parseInt(chapterIndex)}
                        />
                    )}
                    <div className="self-center">
                        <ChapterAdder section={section} />
                    </div>
                </div>
            )}
        </div>
    )
}
