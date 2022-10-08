// TypeScript users only add this code
import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

type ParagraphElement = { type: 'paragraph'; children: CustomText[] }
export type FillerElement = { type: 'filler'; children: CustomText[] }

type CustomElement = ParagraphElement | FillerElement

type CustomText = { text: string; bold?: true; underline?: true }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}
