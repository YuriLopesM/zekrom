import { MonthSelector } from '../../components';
import { useFakeData } from '../../context/FakeDataContext';
import styles from './styles.module.scss';

export const MonthlyReport = () => {
    const { monthlyData } = useFakeData();
     
    const getBalanceStyle = (balance?: string) => {
        if (balance?.includes('-')) {
            return styles.negative;
        }

        return styles.positive;
    }

    return (
        <div className={styles.page}>
            <div className={styles.title}>
                <h2>Relatório Mensal</h2>
                <MonthSelector />
            </div>
            <main className={styles.content}>
                <div className={styles.table}>
                    <header>
                        <p>COLABORADOR</p>
                        <p>CRÉDITO BH</p>
                        <p>DÉBITO BH</p>
                        <p>SALDO MÊS</p>
                        <p>SALDO TOTAL</p>
                    </header>
                    <section>
                        {
                            monthlyData.map(({
                                user,
                                positiveCompTime,
                                negativeCompTime,
                                monthBalance,
                                totalBalance,
                            }) => (
                                <div className={styles.item} key={user.id}>
                                    <p>{user.name}</p>
                                    <p className={styles.positive}>{positiveCompTime}</p>
                                    <p className={styles.negative}>{negativeCompTime}</p>
                                    <p className={getBalanceStyle(monthBalance)}>{monthBalance}</p>
                                    <p className={getBalanceStyle(totalBalance)}>{totalBalance}</p>
                                </div>
                            ))
                        }
                    </section>
                </div>
            </main>
        </div>
    )
}