import styles from './styles.module.scss';

import ProfilePic from '../../assets/profile-pic.jpeg';

interface MyPunchProps {
    name: string;
    sector: string;
    registration: string;
    scale: string;
    office: string;
}

export const MyPunch = ({
    name,
    sector,
    registration,
    scale,
    office
}: MyPunchProps) => {
    return (
        <div className={styles.myPunch}>
            <h2>Meu Ponto</h2>
            <main>
                <img src={ProfilePic} alt="Profile Picture" />
                <section className={styles.info}>
                    <div>
                        <h3>{name}</h3>
                        <p>{sector}</p>
                    </div>
                    <div>
                        <h3>Cadastro</h3>
                        <p>{registration}</p>
                    </div>
                    <div>
                        <h3>Escala</h3>
                        <p>{scale}</p>
                    </div>
                    <div>
                        <h3>Filial/Local</h3>
                        <p>{office}</p>
                    </div>
                </section>
            </main>
        </div>
    );
}