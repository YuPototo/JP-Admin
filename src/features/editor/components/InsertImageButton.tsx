import React, { useState } from 'react'
import { useSlate } from 'slate-react'
import { Image } from 'react-bootstrap-icons'
import ToolbarButton from './ToolbarButton'
import { Range } from 'slate'
import MyModal from '../../../components/MyModal'
import { Formik } from 'formik'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import { calcSize } from '../../../utils/calcSize'
import Button from '../../../components/ui/Button'
import Spinner from '../../../components/ui/Spinner'
import { CustomEditor } from '../CustomEditor'

/**
 * 交互
 *
 * 能够添加图片的前提
 *  - 如果有 selection，selection 必须是 collapsed
 *
 * 交互：
 *   - 如果没有 selection，会添加为最后一个元素
 */

export default function InsertImageButton() {
    const [showModal, setShowModal] = React.useState(false)

    const editor = useSlate()

    const disabled =
        editor.selection !== null && !Range.isCollapsed(editor.selection)

    const handleUploadDone = (url: string) => {
        CustomEditor.insertImage(editor, url, '题目图片')
        setShowModal(false)
    }

    const handleStartUploading = () => {
        if (disabled) {
            return
        }
        setShowModal(true)
    }

    return (
        <>
            <ToolbarButton
                disabled={disabled}
                onMouseDown={handleStartUploading}
            >
                <Image
                    className={disabled ? 'text-gray-400' : 'text-gray-900'}
                />
            </ToolbarButton>

            {showModal && (
                <UpdateImageModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onUpdateDone={handleUploadDone}
                />
            )}
        </>
    )
}

function UpdateImageModal({
    isOpen,
    onClose,
    onUpdateDone,
}: {
    isOpen: boolean
    onClose: () => void
    onUpdateDone: (url: string) => void
}) {
    // const [updateCover] = useUpdateBookCoverMutation()
    const [file, setFile] = useState<File | undefined>()

    // 上限：900kb
    const fileSizeLimit = 900000

    return (
        <MyModal isOpen={isOpen} onModalClosed={onClose}>
            <h2 className="mb-4 font-bold text-green-700">上传图片</h2>

            <Formik
                initialValues={{ cover: '' }}
                validate={(values) => {
                    const errors = {}
                    if (!values.cover) {
                        //@ts-ignore
                        errors.cover = '需要选择图片'
                    }

                    //@ts-ignore
                    if (values.cover.size > fileSizeLimit) {
                        //@ts-ignore
                        errors.cover = '封面尺寸需要小于900kb'
                    }
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    const formData = new FormData()
                    formData.append('cover', values.cover)

                    try {
                        setSubmitting(true)
                        // await updateCover({
                        //     bookId,
                        //     formData,
                        // }).unwrap()
                        toast.success('图片添加成功')
                        setSubmitting(false)
                        //! todo: 修改
                        const random = Math.random()
                        let size = random > 0.5 ? 300 : 250
                        onUpdateDone(`https://picsum.photos/${size}`)
                    } catch (err) {
                        // middle ware 里处理了
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
                                <label htmlFor="cover" className="mr-2">
                                    选择图片
                                </label>

                                <input
                                    id="cover"
                                    name="cover"
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(event) => {
                                        const file =
                                            event.currentTarget.files?.[0]
                                        setFieldValue('cover', file)
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
                            {errors.cover && touched.cover && errors.cover}
                        </div>

                        <div className="mt-4 flex justify-center gap-4">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <Spinner /> : <span>提交</span>}
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
