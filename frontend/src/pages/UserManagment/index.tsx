

import { DeleteIcon, EditIcon } from '../../components/Icons';
import { useFakeData } from '../../context/FakeDataContext';

import styles from './styles.module.scss';

export const UserManagment = () => {
    const { users, handleDeleteUser } = useFakeData();

    return (
        <div className={styles.page}>
            <h2>Gerenciamento de Usuários</h2>
            <main className={styles.content}>
                <div className={styles.table}>
                    <header>
                        <p>NOME</p>
                        <p>CADASTRO</p>
                        <p>ESCALA</p>
                        <p>FILIAL/LOCAL</p>
                        <p>AÇÃO</p>
                    </header>
                    <section>
                        {
                            users.map((user) => (
                                <div className={styles.item} key={user.id}>
                                    <p>{user.name}</p>
                                    <p>{user.registration}</p>
                                    <p>{user.schedule}</p>
                                    <p>{user.location}</p>
                                    <div>
                                        <button>
                                            <EditIcon />
                                        </button>
                                        <button onClick={() => handleDeleteUser(user.id)}>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                </div>
            </main>
        </div>
    )
}