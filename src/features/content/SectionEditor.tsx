import { Formik } from 'formik'
import React from 'react'
import MyModal from '../../components/MyModal'
import Button from '../../components/ui/Button'
import { useUpdateSectionMutation } from './contentService'
import { ISection } from './contentTypes'

type Props = {
    section: ISection
}

export default function SectionEditButton({ section }: Props) {
    const [showModal, setShowModal] = React.useState(false)
    return (
        <>
            <SectionEditModal
                section={section}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <Button outline color="gray" onClick={() => setShowModal(true)}>
                编辑
            </Button>
        </>
    )
}

function SectionEditModal({
    section,
    isOpen,
    onClose,
}: {
    section: ISection
    isOpen: boolean
    onClose: () => void
}) {
    const [updateSection] = useUpdateSectionMutation()

    return (
        <MyModal isOpen={isOpen} onModalClosed={onClose}>
            <h2 className="mb-4 font-bold text-green-700">章</h2>
            <div className="flex gap-4">
                <span>原标题</span>
                <span>{section.title}</span>
            </div>

            <Formik
                initialValues={{ title: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        await updateSection({
                            title: values.title,
                            sectionId: section.id,
                        }).unwrap()
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
                                新标题
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
