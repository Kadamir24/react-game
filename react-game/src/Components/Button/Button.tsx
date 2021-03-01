import React from 'react';
import styles from './Button.module.scss'

type Props = {
    title: string;
    onClick?: () => void;
}

type RoundProps = {
    onClick?: () => void;
}


export const Button: React.FC<Props> = ({title, onClick}) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {title}
        </button>
    )
}



export const RoundButton: React.FC<RoundProps> = ({onClick}) => {

    // const createIconHTML = (icon_name:any) => {
    //     return `<i className="material-icons">${icon_name}</i>`;
    //   };

    return (
        <button className={styles.round_button} onClick={onClick}>
            <i className="material-icons">
                { !localStorage.getItem('mute') ? 'volume_up' : 'volume_off' }
            </i>
        </button>
    )
}

// export default Button;
