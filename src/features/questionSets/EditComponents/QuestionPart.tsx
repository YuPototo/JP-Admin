import _ from 'lodash'
import Button from '../../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    emptyQuestion,
    questionRemove,
    selectQuestionsCount,
} from '../questionSetEditorSlice'
import { INewQuestion, IQuestion } from '../questionSetTypes'
import OptionsPart from './OptionsPart'
import QuestionBodyPart from './QuestionBodyPart'
import QuestionExpalantionPart from './QuestionExpalantionPart'

type Props = {
    index: number
    initialValue?: IQuestion | INewQuestion
}

export default function QuestionPart({
    index,
    initialValue = _.cloneDeep(emptyQuestion),
}: Props) {
    const dispatch = useAppDispatch()
    const questionsCount = useAppSelector(selectQuestionsCount)

    return (
        <div className="rounded bg-gray-50 p-4">
            <div className="text-lg font-bold text-green-800">
                第{index + 1}小题
            </div>

            <div className="ml-2 mt-4 flex flex-col gap-8">
                <QuestionBodyPart
                    index={index}
                    startingValue={initialValue.body}
                />

                <OptionsPart
                    questionIndex={index}
                    startingValue={initialValue.options}
                />

                <QuestionExpalantionPart
                    questionIndex={index}
                    startingValue={initialValue.explanation}
                />
            </div>

            {questionsCount > 1 && (
                <div className="mt-8 flex justify-center">
                    <Button
                        outline
                        color="gray"
                        onClick={() => dispatch(questionRemove(index))}
                    >
                        移除小题
                    </Button>
                </div>
            )}
        </div>
    )
}
