import { useState } from 'react'
import Button from '../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    cleanCategory,
    hasSelectedCatory,
    searchTermChanged,
} from './booksSlice'

export default function SearchBox() {
    const dispatch = useAppDispatch()

    const [searchTerm, setSearchTerm] = useState('')

    const hasCategory = useAppSelector(hasSelectedCatory)

    const handleClean = () => {
        setSearchTerm('')
        dispatch(searchTermChanged(''))
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        dispatch(searchTermChanged(e.target.value))
        if (hasCategory) {
            dispatch(cleanCategory())
        }
    }

    return (
        <div className="flex items-center gap-3">
            <label htmlFor="searchTerm">搜索练习册</label>
            <input
                className="rounded p-2"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                id="searchTerm"
            />
            <Button outline onClick={handleClean}>
                清空
            </Button>
        </div>
    )
}
