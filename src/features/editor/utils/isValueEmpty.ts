import _ from 'lodash'
import { startingParagraph } from '../../questionSets/questionSetEditorSlice'
import { RichTextNode } from '../../questionSets/questionSetTypes'

/**
 * is the value empty?
 */
export function isValueEmpty(value: RichTextNode[]) {
    return _.isEqual(value, startingParagraph)
}
