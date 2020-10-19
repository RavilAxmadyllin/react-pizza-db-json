import axios from  'axios'

export const getPizzas = (category: null | number, sort: string) => {
    const categories = category !== null ? `&category=${category}` : ''
    const sorts = sort ? `?_sort=${sort}&_order=asc` : ''
   return  axios.get<ResponseType>(`http://localhost:3001/pizzas${sorts}${categories}`)
}

type ResponseType = Array<PizzaItemType>
export type PizzaItemType = {
    id: number
    imageUrl: string
    types: Array<number>
    sizes: Array<number>
    name: string
    price: number
    category: number
    rating: number
}

