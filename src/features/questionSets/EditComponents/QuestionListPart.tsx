import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { questionAdded, selectQuestionsCount } from '../questionSetEditorSlice'
import QuestionPart from './QuestionPart'

export default function QuestionListPart() {
    const dispatch = useAppDispatch()
    const questionsCount = useAppSelector(selectQuestionsCount)

    if (questionsCount === 0) {
        return <div className="text-red-500">出错了，题目数量为0</div>
    }

    return (
        <div>
            {Array.from({ length: questionsCount }).map((_, index) => (
                <div key={index} className="my-4">
                    <QuestionPart index={index} />
                </div>
            ))}

            <div>
                <Button outline onClick={() => dispatch(questionAdded())}>
                    新增小题
                </Button>
            </div>
        </div>
    )
}
