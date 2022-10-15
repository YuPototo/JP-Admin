import _ from 'lodash'
import { RichTextNode } from '../../questionSets/questionSetTypes'
import { emptyParagraph } from '../CustomEditor'

/**
 * is the value empty?
 */
export function isValueEmpty(value: RichTextNode[]) {
    return _.isEqual(value, [emptyParagraph])
}
