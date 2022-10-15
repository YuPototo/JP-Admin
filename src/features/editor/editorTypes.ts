// TypeScript users only add this code
import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

type ParagraphElement = { type: 'paragraph'; children: CustomText[] }
export type FillerElement = { type: 'filler'; children: CustomText[] }
export type TipElement = { type: 'tip'; tip: string; children: CustomText[] }
export type ImageElement = {
    type: 'image'
    src: string
    alt: string
    children: [{ text: '' }] // 似无必要，但是为了统一，还是加上
}

export type CustomElement =
    | ParagraphElement
    | FillerElement
    | TipElement
    | ImageElement

type CustomText = { text: string; bold?: true; underline?: true }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}
