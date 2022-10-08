import { useEffect } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { isValueEmpty } from '../../editor/utils/isValueEmpty'
import { errorDiscovered } from '../questionSetEditorSlice'
import { RichTextNode } from '../questionSetTypes'
import RichtTextRenderer from 'jp_to_react'

type Props = {
    body?: RichTextNode[]
}

export default function QuestionSetBody({ body }: Props) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (body !== undefined && isValueEmpty(body)) {
            dispatch(
                errorDiscovered('大题题干为空白。如果不需要，请移除题干。')
            )
        }
    }, [body, dispatch])

    if (body === undefined) {
        return <></>
    }

    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-bold text-green-700">大题题干</h3>
            {isValueEmpty(body) ? (
                <div className="font-bold text-red-700">
                    题干为空白。如果不需要，请移除题干。
                </div>
            ) : (
                <RichtTextRenderer data={body} />
            )}
        </div>
    )
}
