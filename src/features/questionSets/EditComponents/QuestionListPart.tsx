import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { questionAdded, selectQuestions } from '../questionSetEditorSlice'
import { WorkingQuestion } from '../questionSetTypes'
import QuestionPart from './QuestionPart'

type Props = {
    startingValue: WorkingQuestion[]
}

export default function QuestionListPart({ startingValue }: Props) {
    const dispatch = useAppDispatch()

    const questions = useAppSelector(selectQuestions)

    if (questions === undefined || questions?.length === 0) {
        return <div className="text-red-500">出错了，没有小题</div>
    }

    return (
        <div>
            {questions.map((question, index) => (
                <div key={question.uuid} className="my-4">
                    <QuestionPart
                        index={index}
                        startingValue={startingValue[index]}
                    />
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
