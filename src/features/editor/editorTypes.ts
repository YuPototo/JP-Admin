// TypeScript users only add this code
import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

type ParagraphElement = { type: 'paragraph'; children: CustomText[] }
export type FillerElement = { type: 'filler'; children: CustomText[] }
export type TipElement = { type: 'tip'; tip: string; children: CustomText[] }

type CustomElement = ParagraphElement | FillerElement | TipElement

type CustomText = { text: string; bold?: true; underline?: true }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}
