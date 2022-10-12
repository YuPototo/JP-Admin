import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { isValueEmpty } from '../../editor/utils/isValueEmpty'
import { errorDiscovered } from '../questionSetEditorSlice'
import { RichTextNode } from '../questionSetTypes'
import RichtTextRenderer from 'jp_to_react'

type Props = {
    body?: RichTextNode[]
}

export default function QuestionBody({ body }: Props) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (body !== undefined && isValueEmpty(body)) {
            dispatch(
                errorDiscovered('小题题干为空白。如果不需要，请移除题干。')
            )
        }
    }, [body, dispatch])

    if (body === undefined) {
        return <></>
    }

    return (
        <>
            {isValueEmpty(body) ? (
                <div className="font-bold text-red-700">
                    题干为空白。如果不需要，请移除题干。
                </div>
            ) : (
                <RichtTextRenderer data={body} />
            )}
        </>
    )
}
