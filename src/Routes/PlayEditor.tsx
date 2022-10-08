import React, { useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import SlateEditor from '../features/editor/SlateEditor'

export default function PlayEditor() {
    const [value, setValue] = useState<any>([
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ])

    return (
        <PageLayout>
            <SlateEditor
                value={value}
                onChange={(newValue) => setValue(newValue)}
            />
        </PageLayout>
    )
}
