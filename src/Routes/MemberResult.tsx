import { useLocation, useNavigate } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/ui/Button'
import { useAdminAuthGuard } from '../features/user/useAuthGuard'

export default function MemberResult() {
    let location = useLocation()
    const { state } = location

    const navigate = useNavigate()
    useAdminAuthGuard()

    return (
        <PageLayout>
            <h1 className="mb-6 font-bold">开会员 - 结果</h1>

            <div className="mb-4 rounded bg-white p-4">
                <div className="m-2 flex gap-4">
                    <div>id</div>
                    <div>{state.displayId}</div>
                </div>
                <div className="m-2 flex gap-4">
                    <span>之前的会员天数</span>
                    <span>{state.memberDaysBefore}</span>
                </div>
                <div className="m-2 flex gap-4">
                    <span>现在的会员天数</span>
                    <span>{state.memberDaysAfter}</span>
                </div>
            </div>

            <Button outline onClick={() => navigate(-1)}>
                返回
            </Button>
        </PageLayout>
    )
}
