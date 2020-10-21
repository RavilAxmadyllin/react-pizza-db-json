import {Categories, SortPopup} from '../Components'
import {useDispatch, useSelector} from 'react-redux'
import React, {useCallback, useEffect, useState} from 'react'
import {PizzaItemType} from '../api/pizzaAPI'
import {AppStateType} from '../store/store'
import classNames from 'classnames'
import {setCategory, setPizzas, setSort} from '../store/pizza-reducer'
import {addPizza} from '../store/basket-reducer'


export const Main = () => {
    const {pizzas, filter} = useSelector((state: AppStateType) => state.pizza)
    const {items} = useSelector((state: AppStateType) => state.basket)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPizzas({categories: filter.categories, sort: filter.sort}))
    }, [setPizzas, filter.categories, filter.sort, dispatch])
    const changeCategory = (value: number | null) => {
        dispatch(setCategory({value}))
    }
    const changeSortBy = (value: string) => {
        dispatch(setSort({value}))
    }
    const addPizzas = useCallback((id: string, size: number, type: string, url: string, price: number, name: string) => {
        dispatch(addPizza({id, img: url, type, size, price, name}))
    }, [dispatch])
    return (
        <>
            <div className='container'>
                <div className='content__top'>
                    <Categories category={filter.categories} changeCategory={changeCategory}/>
                    <SortPopup currentValue={filter.sort} changeSortBy={changeSortBy}/>
                </div>
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {
                    pizzas.map(item => <PizzaItem
                        key={item.id} pizza={item}
                        addPizza={addPizzas} total={items[item.id] && items[item.id].basket.length}/>)
                }
            </div>
        </>
    )
}

export const PizzaItem: React.FC<PropsType> = React.memo(({pizza, addPizza, total}) => {
    const [selected, setSelected] = useState(pizza.types[0])
    const [size, setSize] = useState(pizza.sizes[0])
    const pizzaType = ['обычное', 'традиционное']
    const sizeType = [26, 30, 40]
    const addPizzaHandler = () => {
        const {id, imageUrl, price, name} = pizza
        addPizza(id, size, pizzaType[selected], imageUrl, price, name)
    }
    return (
        <div className='pizza-block'>
            <img
                className='pizza-block__image'
                src={pizza.imageUrl}
                alt='Pizza'
            />
            <h4 className='pizza-block__title'>{pizza.name}</h4>
            <div className='pizza-block__selector'>
                <ul>
                    {pizzaType.map((el, index) => (
                        <li key={el}
                            onClick={() => setSelected(index)}
                            className={classNames({
                                'active': index === selected,
                                'disabled': !pizza.types.includes(index)
                            })}>
                            {el}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizeType.map((el, index) => (
                        <li key={el}
                            onClick={() => setSize(el)}
                            className={classNames({
                                'active': el === size,
                                'disabled': !pizza.sizes.includes(el)
                            })}>
                            {el} см.
                        </li>)
                    )}
                </ul>
            </div>
            <div className='pizza-block__bottom'>
                <div className='pizza-block__price'>от {pizza.price} ₽</div>
                <div className='button button--outline button--add'>
                    <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                            fill='white'/>
                    </svg>
                    <span onClick={addPizzaHandler}>Добавить</span>
                    {total && <i>{total}</i>}
                </div>
            </div>
        </div>
    )
})
type PropsType = {
    pizza: PizzaItemType
    addPizza: (id: string, size: number, type: string, url: string, price: number, name: string) => void
    total: string | number
}
