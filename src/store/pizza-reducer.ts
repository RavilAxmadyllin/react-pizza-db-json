import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getPizzas, PizzaItemType} from '../api/pizzaAPI'

export const setPizzas = createAsyncThunk('pizza/setPizzas',
    async (param: { categories: number | null, sort: string }, thunkAPI) => {
    const res = await getPizzas(param.categories, param.sort)
    return {pizzas: res.data}
})

const initialState = {
    pizzas: [] as Array<PizzaItemType>,
    filter: {
        categories: null as number | null,
        sort: 'rating'
    }
}
export const slice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<{ value: number | null }>) {
            state.filter.categories = action.payload.value
        },
        setSort(state, action: PayloadAction<{ value: string }>) {
            state.filter.sort = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addCase(setPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload.pizzas
            })
    }
})
export const {setCategory, setSort} = slice.actions
export const pizzaReducer = slice.reducer





