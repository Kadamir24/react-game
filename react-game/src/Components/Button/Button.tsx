import React from 'react';
import styles from './Button.module.scss'

type Props = {
    title: string;
    onClick?: () => void;
}


const Button: React.FC<Props> = ({title, onClick}) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button;
