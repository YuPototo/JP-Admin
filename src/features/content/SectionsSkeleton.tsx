import React from 'react'
import Skeleton from '../../components/ui/Skeleton'

export default function SectionsSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton w="w-4/5" />
            <Skeleton w="w-4/5" />
            <Skeleton w="w-4/5" />
            <Skeleton w="w-4/5" />
        </div>
    )
}
