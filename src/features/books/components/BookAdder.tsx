import { Formik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import { useAddBookMutation } from '../booksService'

export default function BookAdder() {
    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
            <Button outline onClick={() => setShowModal(true)}>
                新增练习册
            </Button>

            <AddBookModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}

function AddBookModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) {
    const navigate = useNavigate()
    const [addBook] = useAddBookMutation()

    return (
        <MyModal isOpen={isOpen} onModalClosed={onClose}>
            <h2 className="mb-4 font-bold text-green-700">创建练习册</h2>

            <Formik
                initialValues={{ title: '', desc: '' }}
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
                        const book = await addBook({
                            title: values.title,
                            desc: values.desc,
                        }).unwrap()
                        toast.success('添加成功')
                        onClose()
                        setSubmitting(false)
                        setTimeout(() => {
                            navigate(
                                `/bookEditor/${book.id}/sectionIndex/0/chapterIndex/0`
                            )
                        }, 1000)
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
                        <div className="my-3">
                            <div>
                                <label
                                    className="mr-4 inline-block w-12"
                                    htmlFor="title"
                                >
                                    标题
                                </label>
                                <input
                                    className="w-60 rounded border p-2"
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

                        <div className="flex items-center">
                            <label
                                className="mr-4 inline-block "
                                htmlFor="desc"
                            >
                                说明
                                <span className="ml-1 text-sm text-gray-500">
                                    (选填)
                                </span>
                            </label>
                            <textarea
                                className="w-96 rounded border p-2"
                                name="desc"
                                id="desc"
                                rows={2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.desc}
                            />
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
