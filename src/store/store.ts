import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
/* import axiosMiddleware from 'redux-axios-middleware' */
import { rootReducer } from './reducers'


export const store = configureStore({
    reducer: rootReducer,
    /*  middleware: [axiosMiddleware(api)], */
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
