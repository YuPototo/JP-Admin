import { Formik } from 'formik'
import React from 'react'
import { Pencil } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'

type Props = {
    bookId: string
}

export default function BookCoverUpdator({ bookId }: Props) {
    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
            <UpdateBookModal
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
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) {
    // const [addBook] = useAddBookMutation()

    return (
        <MyModal isOpen={isOpen} onModalClosed={onClose}>
            <h2 className="mb-4 font-bold text-green-700">上传封面</h2>

            <Formik
                initialValues={{ file: '' }}
                validate={(values) => {
                    const errors = {}
                    if (!values.file) {
                        //@ts-ignore
                        errors.title = '必须有标题'
                    }
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        // const book = await addBook({
                        //     title: values.title,
                        //     desc: values.desc,
                        // }).unwrap()
                        toast.success('添加成功')
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
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="image" className="mr-2">
                            选择图片
                        </label>

                        <input
                            id="image"
                            name="cover"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(event) => {
                                setFieldValue(
                                    'cover',
                                    event.currentTarget.files?.[0]
                                )
                            }}
                        />

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
