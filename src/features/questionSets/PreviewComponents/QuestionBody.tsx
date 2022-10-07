import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { errorDiscovered } from '../questionSetEditorSlice'

type Props = {
    body?: string
}

export default function QuestionBody({ body }: Props) {
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (body === '') {
            dispatch(
                errorDiscovered('小题题干为空白。如果不需要，请移除题干。')
            )
        }
    }, [body, dispatch])

    if (body === undefined) {
        return <></>
    }

    if (body === '') {
        return (
            <div className="font-bold text-red-700">
                题干为空白。如果不需要，请移除题干。
            </div>
        )
    }

    return <div>{body}</div>
}
