import styles from './styles.module.scss';

interface MyPunchProps {
    name: string;
    sector: string;
    registration: string;
    schedule: string;
    location: string;
    imgUrl: string;
}

export const MyPunch = ({
    name,
    sector,
    registration,
    schedule,
    location,
    imgUrl
}: MyPunchProps) => {
    return (
        <div className={styles.myPunch}>
            <h2>Meu Ponto</h2>
            <main>
                <img src={imgUrl} alt="Profile Picture" />
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
                        <p>{schedule}</p>
                    </div>
                    <div>
                        <h3>Filial/Local</h3>
                        <p>{location}</p>
                    </div>
                </section>
            </main>
        </div>
    );
}