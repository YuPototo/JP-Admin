import { IAudio } from '../questionSetTypes'
import TextareaAutosize from 'react-textarea-autosize'
import Button from '../../../components/ui/Button'
import AudioAdder from './AudioAdder'
import { useAppDispatch } from '../../../store/hooks'
import { audioRemoved } from '../questionSetEditorSlice'

type Props = {
    audio: IAudio
}

export default function AudioEditor({ audio }: Props) {
    const dispatch = useAppDispatch()

    // ! 只会从 store 里移除
    // 不会从 cos 和 audio collection 里移除
    const handleDelete = () => {
        dispatch(audioRemoved())
    }

    return (
        <div className="flex flex-col gap-4">
            <div>
                <audio controls src={audio.key} />
            </div>
            <div className="flex items-center gap-6">
                <label className="font-bold text-green-800">听力原文</label>
                <TextareaAutosize
                    className="flex-grow p-3 shadow-md"
                    minRows={1}
                />
            </div>
            <div className="flex gap-4 self-end">
                <AudioAdder buttonColor="gray" buttonText="替换" />
                <Button outline color="red" onClick={handleDelete}>
                    删除
                </Button>
            </div>
        </div>
    )
}
