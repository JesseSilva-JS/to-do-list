import Logo from '../../assets/svg/icon-logo-to-do.svg'
import styles from './Header.module.scss'
export function Header(){
    return(
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <img src={Logo} alt="to-do" />
                </div>
            </header>
        </>
    )
}