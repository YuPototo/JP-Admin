import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { isValueEmpty } from '../../editor/utils/isValueEmpty'
import { errorDiscovered } from '../questionSetEditorSlice'
import { RichTextNode } from '../questionSetTypes'
import RichtTextRenderer from 'jp_to_react'

type Props = {
    explanation?: RichTextNode[]
}

export default function QuestionExplanation({ explanation }: Props) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (explanation !== undefined && isValueEmpty(explanation)) {
            dispatch(errorDiscovered('解析为空白。如果不需要，请移除题干。'))
        }
    }, [explanation, dispatch])

    if (explanation === undefined) {
        return <></>
    }
    return (
        <>
            {isValueEmpty(explanation) ? (
                <div className="font-bold text-red-700">
                    题干为空白。如果不需要，请移除题干。
                </div>
            ) : (
                <RichtTextRenderer data={explanation} />
            )}
        </>
    )
}
