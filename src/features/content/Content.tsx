import Button from '../../components/ui/Button'
import { useGetBookContentQuery } from './contentService'
import Section from './Section'

type Props = {
    bookId: string
    activeSectionIndex: number
}

export default function Content({ bookId, activeSectionIndex }: Props) {
    const { data: sections } = useGetBookContentQuery(bookId)
    return (
        <div className="rounded bg-white p-2">
            {sections?.map((section, index) => (
                <Section
                    key={section.id}
                    section={section}
                    sectionIndex={index}
                    isActive={activeSectionIndex === index}
                />
            ))}

            <div className="mt-4 flex justify-center">
                <div className="h-1 w-16 rounded bg-gray-300"></div>
            </div>
            <div className="mt-4 flex justify-center ">
                <Button outline>新增一章</Button>
            </div>
        </div>
    )
}
