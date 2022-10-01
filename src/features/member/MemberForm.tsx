import { Formik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { useAddMemberMutation } from './memberService'

export default function MemberForm() {
    const navigate = useNavigate()

    const [addMember] = useAddMemberMutation()

    return (
        <Formik
            initialValues={{ userDisplayId: '', months: '' }}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const res = await addMember({
                        userDisplayId: values.userDisplayId,
                        months: parseInt(values.months),
                    }).unwrap()
                    setSubmitting(false)
                    toast.success('修改成功')
                    setTimeout(
                        () =>
                            navigate('/memberResult', {
                                state: res,
                            }),
                        1000
                    )
                } catch (err) {
                    // 在 middleware 处理了
                }
            }}
        >
            {({
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            className="inline-block w-16"
                            htmlFor="userDisplayId"
                        >
                            用户 ID
                        </label>
                        <input
                            className="m-4 w-60 rounded p-2"
                            type="text"
                            name="userDisplayId"
                            id="userDisplayId"
                            onChange={handleChange}
                            value={values.userDisplayId}
                        />
                    </div>
                    <div>
                        <label className="inline-block w-16" htmlFor="months">
                            月数
                        </label>
                        <input
                            className="m-4 w-32 rounded p-2"
                            type="number"
                            name="months"
                            id="months"
                            onChange={handleChange}
                            value={values.months}
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <span>快速选择</span>
                        <div className="flex gap-4">
                            <Button
                                outline
                                onClick={() => setFieldValue('months', '1')}
                            >
                                1月
                            </Button>
                            <Button
                                outline
                                onClick={() => setFieldValue('months', '3')}
                            >
                                3月
                            </Button>
                            <Button
                                outline
                                onClick={() => setFieldValue('months', '1200')}
                            >
                                终身
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button type="submit" disabled={isSubmitting}>
                            确认
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    )
}
