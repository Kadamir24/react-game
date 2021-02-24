import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FandomMenu.module.scss'

const FandomMenu = () => {
    localStorage.removeItem('Fandom')

    return (
        <div className={styles.FandomMenu}>
            <div className={styles.cards}>
            <h1>Choose your fandom</h1>
           
            <div className={styles.card} onClick={() => { 
                localStorage.setItem('Fandom', 'Monogatari')
                setTimeout(() => window.location.reload(false), 0)
                }}>
                <Link to='/Game'>
                    <img
                    src ={`./img/monogatari.jpg`}
                    alt="waifu-name"
                    />
                    <div className={styles.img__description_layer}>
                        <p className={styles.img__description}>Monogatari Series</p>
                    </div>
                </Link>
                </div>
    
        
        
            <div className={styles.card}  onClick={() => { 
                localStorage.setItem('Fandom', 'Evangelion')
                setTimeout(() => window.location.reload(false), 0)
            }}>
                <Link to='/Game'>
                    <img
                    src ={`./img/evangelion.jpg`}
                    alt="waifu-name"
                    />
                    <div className={styles.img__description_layer}>
                        <p className={styles.img__description}>Evangelion</p>
                    </div>
                </Link>
                </div>
    

                <div className={styles.card} onClick={() => { 
                localStorage.setItem('Fandom', 'Fate')
                setTimeout(() => window.location.reload(false), 0)
            }}>
                <Link to='/Game'>
                    <img
                    src ={`./img/fate.jpg`}
                    alt="waifu-name"
                    />
                    <div className={styles.img__description_layer}>
                        <p className={styles.img__description}>Fate/Stay Night</p>
                    </div>
                </Link>
                </div>

            </div>
        </div>
    )
} 

export default FandomMenu;
