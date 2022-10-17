import { Formik, FormikErrors } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import { useAddChapterMutation } from '../contentService'
import { ISection } from '../contentTypes'

type Props = {
    section: ISection
}

export default function ChapterAdder({ section }: Props) {
    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
            <AddChapaterModal
                section={section}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <Button outline onClick={() => setShowModal(true)}>
                新增一节
            </Button>
        </>
    )
}

interface FormValues {
    title: string
    desc: string
}

function AddChapaterModal({
    section,
    isOpen,
    onClose,
}: {
    section: ISection
    isOpen: boolean
    onClose: () => void
}) {
    const [addChapter] = useAddChapterMutation()

    const initialValues: FormValues = { title: '', desc: '' }
    return (
        <MyModal isOpen={isOpen} onModalClosed={onClose}>
            <h2 className="mb-4 font-bold text-green-700">添加一节 Chapter</h2>
            <div className="flex gap-4">
                <div className="text-gray-600">所属章</div>
                <div> {section.title}</div>
            </div>

            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    let errors: FormikErrors<FormValues> = {}
                    if (!values.title) {
                        errors.title = '必须有标题'
                    }
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        await addChapter({
                            title: values.title,
                            desc: values.desc,
                            sectionId: section.id,
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
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form className="mt-6" onSubmit={handleSubmit}>
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
