import React from 'react'

export const Categories:React.FC<PropsType> = ({category, changeCategory}) => {
   const items=['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                <li className={category === null ? 'active' : ''}
                    onClick={() => changeCategory(null)}>Все
                </li>
                {items.map((el, index) => {
                    return <li className={category === index ? 'active' : ''}
                               onClick={() => changeCategory(index)} key={el}>
                        {el}</li>
                })}
            </ul>
        </div>
    )
}
type PropsType = {
    category: null | number
    changeCategory: (value: number | null) => void
}
