import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { errorDiscovered } from '../questionSetEditorSlice'

type Props = {
    option: string
    isAnswer: boolean
}

export default function Option({ option, isAnswer }: Props) {
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (option === '') {
            dispatch(errorDiscovered('选项不能为空白'))
        }
    }, [option, dispatch])

    return (
        <div
            className={clsx(
                'my-2 px-4 py-2',
                isAnswer ? 'bg-green-100' : 'bg-gray-100',
                option === '' && 'text-red-700'
            )}
        >
            {option || '选项不能为空白'}
        </div>
    )
}
