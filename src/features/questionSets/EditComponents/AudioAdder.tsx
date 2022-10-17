import clsx from 'clsx'
import { Formik, FormikErrors } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import Spinner from '../../../components/ui/Spinner'
import { useAppDispatch } from '../../../store/hooks'
import { calcSize } from '../../../utils/calcSize'
import { audioAdded } from '../questionSetEditorSlice'
import { useAddAudioMutation } from '../questionSetService'

type Props = {
    buttonColor?: 'gray' | 'green'
    buttonText?: string
}

export default function AudioAdder({
    buttonColor = 'green',
    buttonText = '添加',
}: Props) {
    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
            <AddAudioModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <Button
                color={buttonColor}
                outline
                onClick={() => setShowModal(true)}
            >
                {buttonText}
            </Button>
        </>
    )
}

interface FormValue {
    audio?: File
}

function AddAudioModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) {
    const dispatch = useAppDispatch()
    const [addAudio] = useAddAudioMutation()
    const [file, setFile] = useState<File | undefined>()

    // 上限：5mb
    const fileSizeLimit = 5000000
    const initialValue: FormValue = {}
    return (
        <MyModal isOpen={isOpen} onModalClosed={onClose}>
            <h2 className="mb-4 font-bold text-green-700">上传听力</h2>

            <Formik
                initialValues={initialValue}
                validate={(values) => {
                    let errors: FormikErrors<FormValue> = {}
                    if (!values.audio) {
                        errors.audio = '必须选择一个听力'
                        return
                    }

                    if (values.audio.size > fileSizeLimit) {
                        errors.audio = '听力文件需要小于5mb'
                    }
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    if (!values.audio) {
                        toast.error('必须选择一个听力')
                        return
                    }

                    const loadingToast = toast.loading('听力上传中，请耐心等待')

                    const formData = new FormData()
                    formData.append('audio', values.audio)

                    try {
                        setSubmitting(true)
                        const audio = await addAudio(formData).unwrap()
                        dispatch(audioAdded(audio))
                        toast.success('听力上传成功')
                        onClose()
                    } catch (err) {
                        // middle ware 里处理了
                    } finally {
                        toast.dismiss(loadingToast)
                        setSubmitting(false)
                    }
                }}
            >
                {({
                    errors,
                    touched,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        {file === undefined ? (
                            <div>
                                <label htmlFor="audio" className="mr-2">
                                    选择听力
                                </label>

                                <input
                                    id="audio"
                                    name="audio"
                                    type="file"
                                    accept=".mp3"
                                    onChange={(event) => {
                                        const file =
                                            event.currentTarget.files?.[0]
                                        setFieldValue('audio', file)
                                        setFile(file)
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <div>
                                    <span className="mr-4 text-gray-600">
                                        文件名
                                    </span>
                                    <span>{file.name}</span>
                                </div>
                                <div
                                    className={clsx(
                                        file.size > fileSizeLimit
                                            ? 'text-red-600'
                                            : 'text-gray-500',
                                        'text-sm'
                                    )}
                                >
                                    {calcSize(file.size)}
                                </div>
                                <div>
                                    <Button
                                        outline
                                        color="gray"
                                        onClick={() => setFile(undefined)}
                                    >
                                        重新选择
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="mt-2 text-sm text-red-600">
                            {errors.audio && touched.audio && errors.audio}
                        </div>

                        <div className="mt-4 flex justify-center gap-4">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <Spinner /> : <span>上传</span>}
                            </Button>
                            <Button outline color="gray" onClick={onClose}>
                                返回
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </MyModal>
    )
}
