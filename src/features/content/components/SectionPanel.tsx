import React from 'react'
import Button from '../../../components/ui/Button'
import { ISection } from '../contentTypes'
import SectionEditButton from './SectionEditor'

type Props = {
    section: ISection
}

export default function SectionPanel({ section }: Props) {
    return (
        <div className="flex items-center rounded bg-white px-4 py-3">
            <div>
                <div className="font-bold text-green-700 ">{section.title}</div>
                <div className="mb-2 flex items-center gap-4">
                    <label className="text-gray-500">id</label>
                    <div className="text-sm text-gray-500">{section.id}</div>
                </div>
            </div>
            <div className="ml-auto flex gap-4">
                <SectionEditButton section={section} />
                <Button outline color="red">
                    隐藏
                </Button>
            </div>
        </div>
    )
}
