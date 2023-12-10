import { useState } from 'react';
import { useFakeData } from '../../context/FakeDataContext';

import { MonthSelector } from '../../components';
import { TabPane } from '../../components/UI';

import styles from './styles.module.scss';
import { ThumbsDown, ThumbsUp } from '../../components/Icons';

export const MonthlyReport = () => {
    const [activeTab, setActiveTab] = useState('hours');
    const { monthlyData, absences, handleChangeAbsenceApproval } = useFakeData();

    const handleTabChange = (tabKey: string) => {
        setActiveTab(tabKey);
    }

    const getBalanceStyle = (balance?: string) => {
        if (balance?.includes('-')) {
            return styles.negative;
        }

        return styles.positive;
    }

    const getCompTimeStyle = (compTime?: string) => {
        if (compTime?.includes('-')) {
            return styles.negative;
        }

        if (compTime === '00:00') {
            return;
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
                <TabPane
                    tabs={[
                        {
                            label: 'Resumo Horas',
                            tabKey: 'hours'
                        },
                        {
                            label: 'Afastamentos',
                            tabKey: 'absences'
                        }
                    ]}
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                />
                {
                    activeTab === 'hours' && (
                        <div className={`${styles.table} ${styles.hours}`}>
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
                                            <p className={getCompTimeStyle(positiveCompTime)}>{positiveCompTime}</p>
                                            <p className={getCompTimeStyle(negativeCompTime)}>{negativeCompTime}</p>
                                            <p className={getBalanceStyle(monthBalance)}>{monthBalance}</p>
                                            <p className={getBalanceStyle(totalBalance)}>{totalBalance}</p>
                                        </div>
                                    ))
                                }
                            </section>
                        </div>
                    )
                }

                {
                    activeTab === 'absences' && (
                        <div className={`${styles.table} ${styles.absences}`}>
                            <header>
                                <p>COLABORADOR</p>
                                <p>DATA</p>
                                <p>JUSTIFICATIVA</p>
                                <p>APROVADO</p>
                            </header>
                            <section>
                                {
                                    absences.map(({
                                        user,
                                        date,
                                        justification,
                                        isApproved
                                    }) => (
                                        <div className={styles.item} key={user.id}>
                                            <p>{user.name}</p>
                                            <p>{date}</p>
                                            <p>{justification}</p>
                                            <div className={styles.approval}>
                                                <ThumbsUp 
                                                    className={`${isApproved ? styles.approved : null}`}
                                                    onClick={() => handleChangeAbsenceApproval({
                                                        date,
                                                        isApproved: true
                                                    })}
                                                />
                                                <ThumbsDown 
                                                    className={`${isApproved === false ? styles.notApproved : null}`}
                                                    onClick={() => handleChangeAbsenceApproval({
                                                        date,
                                                        isApproved: false
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </section>
                        </div>
                    )
                }
            </main>
        </div>
    )
}