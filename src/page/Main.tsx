import {Categories, SortPopup} from '../Components'
import {useSelector} from 'react-redux'
import React, {useEffect, useState} from 'react'
import {PizzaItemType} from '../api/pizzaAPI'
import {AppStateType} from '../store/store'
import {asyncActions} from '../store/pizza-reducer'
import {useActions} from '../utils/redux-utils'
import classNames from 'classnames'

export const Main = () => {
    const {pizzas, filter} = useSelector((state: AppStateType) => state.pizza)
    const {setPizzas, setCategory, setSort} = useActions(asyncActions)
    useEffect(() => {
        setPizzas({categories: filter.categories, sort: filter.sort})
    }, [setPizzas, filter.categories, filter.sort])
    const changeCategory = (value: number | null) => {
        setCategory({value})
    }
    const changeSortBy = (value:string) => {
        setSort({value})
    }
    return (
        <>
            <div className='container'>
                <div className='content__top'>
                    <Categories category={filter.categories} changeCategory={changeCategory} />
                    <SortPopup currentValue={filter.sort} changeSortBy={changeSortBy} />
                </div>
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {
                    pizzas.map(item => <PizzaItem key={item.id} pizza={item}/>)
                }
            </div>
        </>
    )
}

export const PizzaItem: React.FC<PropsType> = ({pizza}) => {
    const [selected, setSelected] = useState(pizza.types[0])
    const [size, setSize] = useState(pizza.sizes[0])
    const pizzaType = ['обычное', 'традиционное']
    const sizeType = [26, 30, 40]
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
                                'disabled': !pizza.types.includes(index)})}>
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
                    <span>Добавить</span>
                    <i>2</i>
                </div>
            </div>
        </div>
    )
}
type PropsType = {
    pizza: PizzaItemType
}
