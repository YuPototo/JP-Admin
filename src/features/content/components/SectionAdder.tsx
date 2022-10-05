import { Formik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import { useAddSectionMutation } from '../contentService'

type Props = {
    bookId: string
}

export default function SectionAdder({ bookId }: Props) {
    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
            <AddSectionmodal
                bookId={bookId}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <Button outline onClick={() => setShowModal(true)}>
                新增一章
            </Button>
        </>
    )
}

function AddSectionmodal({
    bookId,
    isOpen,
    onClose,
}: {
    bookId: string
    isOpen: boolean
    onClose: () => void
}) {
    const [addSection] = useAddSectionMutation()

    return (
        <MyModal isOpen={isOpen} onModalClosed={onClose}>
            <h2 className="mb-4 font-bold text-green-700">添加一章</h2>

            <Formik
                initialValues={{ title: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        await addSection({
                            title: values.title,
                            bookId,
                        }).unwrap()
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
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label
                                className="inline-block w-12"
                                htmlFor="title"
                            >
                                标题
                            </label>
                            <input
                                className="m-4 w-60 rounded border p-2"
                                autoFocus
                                type="title"
                                name="title"
                                id="title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
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
