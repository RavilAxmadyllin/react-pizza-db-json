import {createSlice, PayloadAction} from '@reduxjs/toolkit'


const initialState: InitialType = {
    items: {},
    totalPrice: 0,
    totalCount: 0
}
export const slice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addPizza(state, action: PayloadAction<{ id: string, size: number, type: string, img: string, price: number, name: string }>) {
            if (!state.items[action.payload.id]) {
                state.items[action.payload.id] = {
                    basket: [],
                    currentSum: 0
                }
            }
            const currentItem = state.items[action.payload.id]
            currentItem.basket.push(action.payload)
            currentItem.currentSum = state.items[action.payload.id].basket.reduce((acc, el) => acc + el.price, 0)
            state.totalPrice = state.totalPrice + action.payload.price
            state.totalCount = Object.keys(state.items).reduce((acc, el) => {
                return acc + state.items[el].basket.length
            }, 0)
        },
        clearBasket(state) {
            state.items = {}
            state.totalPrice = 0
            state.totalCount = 0
        },
        clearCurrentItem(state, action: PayloadAction<{ id: string }>) {
            const currentItem = state.items[action.payload.id]
            state.totalPrice -= currentItem.currentSum
            state.totalCount -= currentItem.basket.length
            delete state.items[action.payload.id]
        },
        decrementPizzaItem(state, action: PayloadAction<{ id: string }>) {
            const index = state.items[action.payload.id].basket.findIndex(el => el.id === action.payload.id)
            const currentItem = state.items[action.payload.id]
            if (currentItem.basket.length > 1) {
                console.log(state.items[action.payload.id].basket.length)
                currentItem.currentSum -= currentItem.basket[index].price
                state.totalPrice -= currentItem.basket[index].price
                state.totalCount--
                currentItem.basket.splice(index, 1)
            }

        },
        incrementPizzaItem(state, action: PayloadAction<{ id: string }>) {
            const pizza = state.items[action.payload.id].basket.find(el => el.id === action.payload.id)
            const currentItem = state.items[action.payload.id]
            if (pizza) {
                currentItem.basket.push(pizza)
                currentItem.currentSum += pizza.price
                state.totalCount++
                state.totalCount = state.totalCount - pizza.price
            }

        }
    }


})
export const basketReducer = slice.reducer
export const {addPizza, clearBasket, clearCurrentItem, decrementPizzaItem, incrementPizzaItem} = slice.actions

type InitialType = {
    items: {
        [key: string]: {
            basket: Array<BasketType>
            currentSum: number
        }
    }
    totalPrice: number
    totalCount: number
}
type BasketType = {
    id: string
    size: number,
    type: string,
    img: string
    price: number
    name: string
}
