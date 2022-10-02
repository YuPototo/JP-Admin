import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import stringifyRtkQuerryError from '../../../store/storeUtils/stringifyRtkQuerryError'
import {
    selectChildrenByLevel,
    categoryPicked,
    cleanCategory,
    hasSelectedCatory,
} from '../booksSlice'
import { useGetCategoriyesQuery } from '../booksService'
import type { Category } from '../booksTypes'
import Button from '../../../components/ui/Button'
import Skeleton from '../../../components/ui/Skeleton'

export default function CategoryNav() {
    const { isLoading, error } = useGetCategoriyesQuery()
    const dispatch = useAppDispatch()

    const topCategories = useAppSelector((state) => state.books.categories)
    const hasCategory = useAppSelector(hasSelectedCatory)

    return (
        <div className="my-4 rounded bg-white p-2">
            {isLoading ? (
                <CategorySkeleton />
            ) : (
                <CategoryList categories={topCategories} categoryLevel={0} />
            )}

            {error && (
                <span className="text-red-500">
                    {`获取内容分类出错：${stringifyRtkQuerryError(error)}`}
                </span>
            )}

            {hasCategory && (
                <div className="m-1 ml-5">
                    <Button
                        outline
                        color="gray"
                        onClick={() => dispatch(cleanCategory())}
                    >
                        清除筛选
                    </Button>
                </div>
            )}
        </div>
    )
}

interface CategoryListProps {
    categories: Category[]
    categoryLevel: number
    selectedCategoryKeys?: string[]
}

function CategoryList({ categories, categoryLevel }: CategoryListProps) {
    const dispatch = useAppDispatch()
    const children = useAppSelector(selectChildrenByLevel(categoryLevel))

    const selectedCategoryKey = useAppSelector(
        (state) => state.books.selectedCategoryKeys?.[categoryLevel]
    )

    const handleClickCategory = (key: string) => {
        dispatch(categoryPicked({ categoryLevel, key }))
    }

    return (
        <>
            <div className="m-2 mb-4">
                {categories.map((category) => (
                    <span
                        className={clsx(
                            {
                                'bg-green-200':
                                    selectedCategoryKey === category.key,
                            },
                            {
                                'bg-gray-100':
                                    selectedCategoryKey !== category.key,
                            },
                            'm-2 rounded p-1.5 hover:cursor-pointer hover:bg-green-200'
                        )}
                        key={category.key}
                        onClick={() => handleClickCategory(category.key)}
                    >
                        {category.displayValue}
                    </span>
                ))}
            </div>
            <div className="m-2">
                {children && (
                    <CategoryList
                        categories={children}
                        categoryLevel={categoryLevel + 1}
                    />
                )}
            </div>
        </>
    )
}

function CategorySkeleton() {
    return (
        <div className="flex gap-4">
            <Skeleton w="w-16" />
            <Skeleton w="w-16" />
        </div>
    )
}
