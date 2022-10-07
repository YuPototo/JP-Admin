import { useAppSelector } from '../../../store/hooks'
import { selectHasAudio } from '../questionSetEditorSlice'
import AudioAdder from './AudioAdder'
import AudioEditor from './AudioEditor'

export default function AudioPart() {
    const hasAudio = useAppSelector(selectHasAudio)
    const audio = useAppSelector(
        (state) => state.questionSetEditor.questionSet?.audio
    )

    return (
        <div className="rounded bg-gray-100 p-4">
            <div className="text-lg font-bold text-green-800">音频</div>
            {hasAudio ? (
                <div>{audio && <AudioEditor audio={audio} />}</div>
            ) : (
                <div className="flex items-center gap-4">
                    <div className="color-gray-700 text-sm">
                        每个大题可以添加一个音频。用于听力题。
                    </div>
                    <AudioAdder />
                </div>
            )}
        </div>
    )
}
