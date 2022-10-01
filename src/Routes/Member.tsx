import PageLayout from '../components/layout/PageLayout'
import { useAdminAuthGuard } from '../features/user/useAuthGuard'

export default function Member() {
    useAdminAuthGuard()

    return <PageLayout>Member Page</PageLayout>
}
