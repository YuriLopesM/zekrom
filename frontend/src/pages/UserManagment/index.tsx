

import { DeleteIcon, EditIcon } from '../../components/Icons';
import { useLocalStorage } from '../../hooks';

import { v4 as uuidv4 } from 'uuid';

import styles from './styles.module.scss';

interface UserFormat {
    id: string;
    name: string;
    registration: string;
    schedule: string;
    location: string;
}

export const UserManagment = () => {
    const [users, setUsers] = useLocalStorage<UserFormat[]>('users-list:zekron', [
        {
            id: uuidv4(),
            name: 'Yuri Lopes Machado',
            registration: '000001',
            schedule: '1 - 08h-12h/13h-17h',
            location: 'Matriz - Criciúma/SC'
        },
        {
            id: uuidv4(),
            name: 'Vitor Minatto Barp',
            registration: '000002',
            schedule: '1 - 08h-12h/13h-17h',
            location: 'Matriz - Criciúma/SC'
        },
        {
            id: uuidv4(),
            name: 'Danilo Formanski',
            registration: '000003',
            schedule: '1 - 08h-12h/13h-17h',
            location: 'Matriz - Criciúma/SC'
        },
        {
            id: uuidv4(),
            name: 'João Victor Miotelli',
            registration: '000004',
            schedule: '1 - 08h-12h/13h-17h',
            location: 'Matriz - Criciúma/SC'
        },
        {
            id: uuidv4(),
            name: 'Vinicius Albino',
            registration: '000005',
            schedule: '1 - 08h-12h/13h-17h',
            location: 'Matriz - Criciúma/SC'
        },
        {
            id: uuidv4(),
            name: 'Lucas Alano',
            registration: '000006',
            schedule: '1 - 08h-12h/13h-17h',
            location: 'Matriz - Criciúma/SC'
        },
    ]);

    const handleDeleteUser = (id: string) => {
        const hasConfirmed = confirm('Deseja realmente excluir este usuário?')

        if (!hasConfirmed) return;

        const newUsers = users.filter(user => user.id !== id);

        setUsers(newUsers);
    }

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
                            users.map((user, index) => (
                                <div className={styles.item} key={index}>
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