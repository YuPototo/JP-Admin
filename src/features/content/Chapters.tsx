import clsx from 'clsx'
import { Link, useParams } from 'react-router-dom'
import { IChapter } from './contentTypes'

type Props = {
    chapters: IChapter[]
    chapterIndex: number
}

export default function Chapters({ chapters, chapterIndex }: Props) {
    const { bookId, sectionIndex } = useParams() as {
        bookId: string
        sectionIndex: string
    }

    return (
        <div className="mb-4">
            {chapters.map((chapter, index) => (
                <Link
                    to={`/bookEditor/${bookId}/sectionIndex/${sectionIndex}/chapterIndex/${index}`}
                >
                    <div
                        key={chapter.id}
                        className={clsx(
                            'my-1  rounded p-2 pl-5 hover:bg-green-200',
                            { 'bg-green-100': chapterIndex === index }
                        )}
                    >
                        {chapter.title}
                    </div>
                </Link>
            ))}
        </div>
    )
}
