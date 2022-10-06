import clsx from 'clsx'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Pencil } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import Spinner from '../../../components/ui/Spinner'
import { calcSize } from '../../../utils/calcSize'
import { useUpdateBookCoverMutation } from '../booksService'

type Props = {
    bookId: string
}

export default function BookCoverUpdator({ bookId }: Props) {
    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
            <UpdateBookModal
                bookId={bookId}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <button
                className="rounded-full border border-gray-600 bg-white bg-opacity-80 p-2 text-gray-600  hover:bg-gray-600 hover:text-white"
                onClick={() => setShowModal(true)}
            >
                <Pencil />
            </button>
        </>
    )
}

function UpdateBookModal({
    bookId,
    isOpen,
    onClose,
}: {
    bookId: string
    isOpen: boolean
    onClose: () => void
}) {
    const [updateCover] = useUpdateBookCoverMutation()
    const [file, setFile] = useState<File | undefined>()

    // 上限：100kb
    const fileSizeLimit = 100000

    return (
        <MyModal isOpen={isOpen} onModalClosed={onClose}>
            <h2 className="mb-4 font-bold text-green-700">上传封面</h2>

            <Formik
                initialValues={{ cover: '' }}
                validate={(values) => {
                    const errors = {}
                    if (!values.cover) {
                        //@ts-ignore
                        errors.cover = '必须选择封面'
                    }

                    //@ts-ignore
                    if (values.cover.size > fileSizeLimit) {
                        //@ts-ignore
                        errors.cover = '封面尺寸需要小于200kb'
                    }
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    const formData = new FormData()
                    formData.append('cover', values.cover)

                    try {
                        setSubmitting(true)
                        await updateCover({
                            bookId,
                            formData,
                        }).unwrap()
                        toast.success('图片添加成功')
                        onClose()
                        setSubmitting(false)
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
