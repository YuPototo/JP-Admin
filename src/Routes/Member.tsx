import PageLayout from '../components/layout/PageLayout'
import MemberForm from '../features/member/MemberForm'
import { useAdminAuthGuard } from '../features/user/useAuthGuard'

export default function Member() {
    useAdminAuthGuard()

    return (
        <PageLayout>
            <h1 className="mb-6 font-bold text-white">开会员</h1>
            <MemberForm />
        </PageLayout>
    )
}
