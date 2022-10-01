import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import stringifyRtkQuerryError from '../../store/storeUtils/stringifyRtkQuerryError'
import { selectChildrenByLevel, categoryPicked } from './booksSlice'
import { useGetCategoriyesQuery } from './booksService'
import type { Category } from './booksTypes'
import React from 'react'

export default function CategoryNav() {
    const { isLoading, error } = useGetCategoriyesQuery()

    const topCategories = useAppSelector((state) => state.bookList.categories)

    return (
        <div className="my-4 rounded bg-white p-1">
            {isLoading ? (
                <div className="skeleton mb-4 h-6 w-60"></div>
            ) : (
                <CategoryList categories={topCategories} categoryLevel={0} />
            )}

            {error && (
                <span className="text-red-500">
                    {`获取内容分类出错：${stringifyRtkQuerryError(error)}`}
                </span>
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
        (state) => state.bookList.selectedCategoryKeys?.[categoryLevel]
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
