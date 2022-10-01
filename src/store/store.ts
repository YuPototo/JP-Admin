import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { splitApi } from './query/splitApi'

import bookListReducer from '../features/books/booksSlice'
import userReducer from '../features/user/userSlice'
import { queryErrorMiddleware } from './middleware/queryErrorMiddleware'

const rootReducer = combineReducers({
    [splitApi.reducerPath]: splitApi.reducer,
    bookList: bookListReducer,
    user: userReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            splitApi.middleware,
            queryErrorMiddleware
        ),
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer> //https://github.com/reduxjs/redux/issues/4267

// export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
