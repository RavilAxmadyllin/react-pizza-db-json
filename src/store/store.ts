import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import {pizzaReducer} from './pizza-reducer'
import { basketReducer } from './basket-reducer'

const rootReducer = combineReducers({
    pizza: pizzaReducer,
    basket: basketReducer
})
export const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})
//type
export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = typeof store.dispatch
