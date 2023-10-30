import styles from './styles.module.scss';

import ProfilePic from '../../assets/profile-pic.jpeg';

export const MyPunch = () => {
    return (
        <div className={styles.myPunch}>
            <h2>Meu Ponto</h2>
            <main>
                <img src={ProfilePic} alt="Profile Picture" />
                <section className={styles.info}>
                    <div>
                        <h3>Ryan Gomes</h3>
                        <p>Administração</p>
                    </div>
                    <div>
                        <h3>Cadastro</h3>
                        <p>5233</p>
                    </div>
                    <div>
                        <h3>Escala</h3>
                        <p>12 - 08h-12h/13h-17h</p>
                    </div>
                    <div>
                        <h3>Filial/Local</h3>
                        <p>Matriz - Criciúma/SC</p>
                    </div>
                </section>
            </main>
        </div>
    );
}