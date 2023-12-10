import { Logo } from '..';
import { useAuth } from '../../context/AuthContext';
import { SignOut } from '../Icons';

import styles from './styles.module.scss'

export const MainHeader = () => {
    const { user, handleLogout } = useAuth();

    return (
        <header className={styles.header}>
            <Logo type="logo"/>
            <div className={styles.userInfo}>
                <section 
                    className={styles.initialSection}
                >
                    <p>{user?.name}</p>
                </section>
                <section
                    className={styles.signOut}
                    onClick={() => handleLogout()}
                >
                    <p>Encerrar Sessão</p>
                    <SignOut />
                </section>
            </div>
        </header>
    )
}