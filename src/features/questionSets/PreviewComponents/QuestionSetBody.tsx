type Props = {
    body?: string
}

export default function QuestionSetBody({ body }: Props) {
    if (body === undefined) {
        return <></>
    }

    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-bold text-green-700">大题题干</h3>
            {body === '' ? (
                <div className="font-bold text-red-700">
                    题干为空白。如果不需要，请移除题干。
                </div>
            ) : (
                <div>{body}</div>
            )}
        </div>
    )
}
