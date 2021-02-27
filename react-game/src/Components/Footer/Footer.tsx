import styles from './Footer.module.scss'

const Footer: React.FC<any> = () => {

  return (
    <div className={styles.footer}>
        <div className={styles.left}>
            <a href="https://rs.school/js/">
                <img src="./img/rs-logo.svg" alt="rsschool" className={styles.logo}/>
            </a>
            <div className={styles.year}>2021</div>
        </div>
        <div>
            <a href="https://github.com/Kadamir24" className={styles.author}>Github: Kadamir24</a>
        </div>
    </div>
  );
}

export default Footer;
