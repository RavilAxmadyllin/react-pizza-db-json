import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import classNames from 'classnames'

export const Button: React.FC<ButtonType> = (props) => {
    const {children, className, ...restProps} = props
    return <button
        className={classNames('button', className, {'button-outline': ''})} {...restProps}>
        {children}</button>
}

type ButtonType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
