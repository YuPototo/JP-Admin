import { useParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import BookInfo from '../features/books/components/BookInfo'
import ChapterPanel from '../features/content/components/ChapterPanel'
import Content from '../features/content/components/Content'
import { useGetBookContentQuery } from '../features/content/contentService'
import SectionPanel from '../features/content/components/SectionPanel'
import QuestionSetList from '../features/questionSets/QuestionSetList'
import useAuthGuard from '../features/user/useAuthGuard'
import SectionAdder from '../features/content/components/SectionAdder'

export default function BookEditor() {
    useAuthGuard()

    let { bookId, sectionIndex, chapterIndex } = useParams() as {
        bookId: string
        sectionIndex: string
        chapterIndex: string
    }

    const { data: sections } = useGetBookContentQuery(bookId)

    const activeSection = sections?.[parseInt(sectionIndex)]

    const activeChapter = activeSection?.chapters?.[parseInt(chapterIndex)]

    const hasSection = sections?.length !== undefined && sections.length > 0

    return (
        <PageLayout>
            <div className="mb-4">
                <BookInfo bookId={bookId} />
            </div>

            {hasSection && (
                <div className="flex">
                    <div className="mr-4 w-64">
                        <Content
                            bookId={bookId}
                            activeSectionIndex={parseInt(sectionIndex)}
                        />
                    </div>
                    <div className="flex flex-grow flex-col gap-3">
                        {activeSection && (
                            <SectionPanel section={activeSection} />
                        )}
                        {activeChapter && (
                            <ChapterPanel chapter={activeChapter} />
                        )}
                        {activeChapter && (
                            <QuestionSetList chapterId={activeChapter.id} />
                        )}
                    </div>
                </div>
            )}

            {hasSection || (
                <div className="rounded bg-white p-4">
                    <div>这本练习册还没有内容</div>
                    <div className="mt-3">
                        <SectionAdder bookId={bookId} />
                    </div>
                </div>
            )}
        </PageLayout>
    )
}
