import Skeleton from '../../../components/ui/Skeleton'

export default function BookSkeleton() {
    return (
        <div className="flex h-44 w-80 gap-3 rounded bg-white p-2">
            <div>
                <Skeleton h="h-full" rounded="rounded" />
            </div>
            <div className="flex flex-grow flex-col gap-2">
                <Skeleton w="w-16" />
                <Skeleton w="w-full" />
            </div>
        </div>
    )
}
