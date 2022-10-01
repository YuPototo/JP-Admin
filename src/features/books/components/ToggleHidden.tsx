import { Switch } from '@headlessui/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useUpdateBookMutation } from '../booksService'
import { IBook } from '../booksTypes'

export default function ToggleHidden({ book }: { book: IBook }) {
    const [enabled, setEnabled] = useState(book.hidden)

    const [updateBook] = useUpdateBookMutation()

    const handleChange = async () => {
        try {
            setEnabled(!enabled)
            await updateBook({ hidden: !enabled, bookId: book.id }).unwrap()
            toast.success('更新成功')
        } catch (err) {
            setEnabled(enabled)
        }
    }

    return (
        <div className="flex gap-2">
            <Switch
                checked={enabled}
                onChange={handleChange}
                className={`${
                    enabled ? 'bg-green-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
                <span
                    className={`${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
            </Switch>
            <div className="text-gray-700">{book.hidden && '已'}隐藏</div>
        </div>
    )
}
