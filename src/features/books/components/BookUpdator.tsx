import { Formik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import { useUpdateBookMutation } from '../booksService'
import { IBook } from '../booksTypes'

type Props = {
    book: IBook
}

export default function BookUpdator({ book }: Props) {
    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
            <BookEditorModal
                book={book}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <Button outline color="gray" onClick={() => setShowModal(true)}>
                编辑
            </Button>
        </>
    )
}

function BookEditorModal({
    book,
    isOpen,
    onClose,
}: {
    book: IBook
    isOpen: boolean
    onClose: () => void
}) {
    const [updateBook] = useUpdateBookMutation()

    return (
        <MyModal isOpen={isOpen} onModalClosed={onClose}>
            <h2 className="mb-4 font-bold text-green-700">练习册信息</h2>
            <Formik
                initialValues={{
                    title: book.title,
                    desc: book.desc || '',
                }}
                validate={(values) => {
                    const errors = {}
                    if (!values.title) {
                        //@ts-ignore
                        errors.title = '必须有标题'
                    }
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        await updateBook({
                            title: values.title,
                            desc: values.desc,
                            bookId: book.id,
                        }).unwrap()
                        toast.success('更新成功')
                        onClose()
                        setSubmitting(false)
                    } catch (err) {
                        // middle ware 里处理了
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <div>
                                <label
                                    className="inline-block w-16"
                                    htmlFor="title"
                                >
                                    新标题
                                </label>
                                <input
                                    className="ml-4 w-60 rounded border p-2"
                                    autoFocus
                                    type="title"
                                    name="title"
                                    id="title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                />
                            </div>
                            <div className="ml-16 text-sm text-red-500">
                                {errors.title && touched.title && errors.title}
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center">
                                <label
                                    className="inline-block w-16"
                                    htmlFor="desc"
                                >
                                    说明
                                </label>
                                <textarea
                                    className="ml-4 w-96 rounded border p-2"
                                    name="desc"
                                    id="desc"
                                    rows={2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.desc}
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex justify-center gap-4">
                            <Button type="submit" disabled={isSubmitting}>
                                提交
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
