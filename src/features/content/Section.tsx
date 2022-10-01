import clsx from 'clsx'
import { Link, useParams } from 'react-router-dom'
import Chapters from './Chapters'
import { ISection } from './contentTypes'

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
                <Chapters
                    chapters={section.chapters}
                    chapterIndex={parseInt(chapterIndex)}
                />
            )}
        </div>
    )
}
