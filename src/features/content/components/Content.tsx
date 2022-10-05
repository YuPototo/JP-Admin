import { useGetBookContentQuery } from '../contentService'
import SectionsSkeleton from './SectionsSkeleton'
import Section from './Section'
import SectionAdder from './SectionAdder'

type Props = {
    bookId: string
    activeSectionIndex: number
}

export default function Content({ bookId, activeSectionIndex }: Props) {
    const { data: sections, isLoading } = useGetBookContentQuery(bookId)

    return (
        <div className="rounded bg-white p-2">
            <div className="mx-2 mb-4 mt-2 flex items-center justify-between">
                <h2 className=" font-bold text-green-700">目录</h2>
                <SectionAdder bookId={bookId} />
            </div>

            {isLoading && <SectionsSkeleton />}

            {sections && (
                <>
                    {sections.map((section, index) => (
                        <Section
                            key={section.id}
                            section={section}
                            sectionIndex={index}
                            isActive={activeSectionIndex === index}
                        />
                    ))}
                </>
            )}
        </div>
    )
}
