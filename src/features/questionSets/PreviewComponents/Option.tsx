import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { isValueEmpty } from '../../editor/utils/isValueEmpty'
import { errorDiscovered } from '../questionSetEditorSlice'
import { RichTextNode } from '../questionSetTypes'
import RichtTextRenderer from 'jp_to_react'

type Props = {
    option: RichTextNode[]
    isAnswer: boolean
}

export default function Option({ option, isAnswer }: Props) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isValueEmpty(option)) {
            dispatch(errorDiscovered('选项为空白。'))
        }
    }, [option, dispatch])

    return (
        <div
            className={clsx(
                'my-2 px-4 py-2',
                isAnswer ? 'bg-green-100' : 'bg-gray-100',
                isValueEmpty(option) && 'text-red-700'
            )}
        >
            {isValueEmpty(option) ? (
                '选项不能为空白'
            ) : (
                <RichtTextRenderer data={option} />
            )}
        </div>
    )
}
