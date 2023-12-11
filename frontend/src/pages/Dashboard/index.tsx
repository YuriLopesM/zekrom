import { useEffect, useState } from "react";

import { BigNumber, HourTable, MonthSelector, MyPunch } from "../../components"
import { TabPane } from "../../components/UI";

import { MonthlyData, UserData, WarningType } from "../../types";

import styles from './styles.module.scss';
import { useFakeData } from "../../context/FakeDataContext";
import { useAuth } from "../../context/AuthContext";
import { filterBySelectedDate } from "../../utils";

interface MonthlyDataFormatted extends Omit<MonthlyData, 'date'> {
    user: UserData;
}

export const Dashboard = () => {
    const { user: userAuthenticated } = useAuth()
    const { hourPoints, data, selectedDate } = useFakeData()

    const [activeTab, setActiveTab] = useState('days');
    const [userMonthlyData, setUserMonthlyData] = useState<MonthlyDataFormatted>({} as MonthlyDataFormatted);

    useEffect(() => {
        const monthlyData: MonthlyDataFormatted[] = data.map(({ monthlyData, user }) => {
            const filteredMonthlyData = filterBySelectedDate(monthlyData, selectedDate)
            return filteredMonthlyData.map(item => {
                const formattedItem = {
                    ...item,
                    user
                }

                return formattedItem;
            })
        }).flat();

        const formattedUserMonthlyData = monthlyData.filter(({ user }) => {
            return user.id === userAuthenticated?.id
        })[0]

        console.log(monthlyData)
        console.log(formattedUserMonthlyData)
        setUserMonthlyData(formattedUserMonthlyData)
    }, [userAuthenticated])

    const handleTabChange = (tabKey: string) => {
        setActiveTab(tabKey);
    }

    // const hourPoints: HourPoints[] = [
    //     {
    //         date: new Date(),
    //         scaleId: '1',
    //         situations: [
    //             {
    //                 hour: '08:00',
    //                 description: 'Situação',
    //                 status: 'normal'
    //             }
    //         ],
    //         warnings: [
    //             {
    //                 description: 'Expira em 2 dias',
    //                 type: WarningType.POSITIVE
    //             }
    //         ]
    //     },
    //     {
    //         date: new Date(),
    //         scaleId: '1',
    //         annotation: '08:00 12:00 13:00 18:20',
    //         situations: [
    //             {
    //                 hour: '08:00',
    //                 description: '01 Trabalhando',
    //                 status: 'normal'
    //             },
    //             {
    //                 hour: '01:20',
    //                 description: '02 Crédito BH',
    //                 status: 'wrong'
    //             }
    //         ],
    //         warnings: [
    //             {
    //                 description: 'Com o Gestor',
    //                 type: WarningType.NEUTRAL
    //             }
    //         ]
    //     },
    //     {
    //         date: new Date(),
    //         scaleId: '1',
    //         warnings: [
    //             {
    //                 description: 'Expirado',
    //                 type: WarningType.NEGATIVE
    //             }
    //         ]
    //     }
    // ]

    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <MyPunch
                    name={userMonthlyData?.user?.name}
                    sector={userMonthlyData?.user?.sector}
                    registration={userMonthlyData?.user?.registration}
                    schedule={userMonthlyData?.user?.schedule}
                    location={userMonthlyData?.user?.location}
                    imgUrl={userMonthlyData?.user?.imgUrl}
                />
                <MonthSelector />
            </section>
            <main className={styles.content}>
                <TabPane
                    tabs={[
                        {
                            label: 'Esquema de Dias',
                            tabKey: 'days'
                        },
                        {
                            label: 'Pendentes',
                            tabKey: 'pending'
                        },
                        {
                            label: 'Totais',
                            tabKey: 'total'
                        }
                    ]}
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                />
                {
                    activeTab === 'days' && (
                        <HourTable
                            data={hourPoints}
                        />
                    )
                }

                {
                    activeTab === 'pending' && (
                        <HourTable
                            data={hourPoints.filter(({ warnings }) => warnings && warnings.every(w => w.type === WarningType.NEUTRAL) && warnings.length > 0)}
                        />
                    )
                }

                {
                    activeTab === 'total' && (
                        <div className={styles.bigNumberContainer}>
                            <BigNumber
                                label="Saldo do Banco"
                                value={userMonthlyData.totalBalance || '00:00'}
                                status="neutral"
                            />
                            <BigNumber
                                label="Crédito Banco"
                                value={userMonthlyData.positiveCompTime || '00:00'}
                                status="positive"
                            />
                            <BigNumber
                                label="Débito Banco"
                                value={userMonthlyData.negativeCompTime || '00:00'}
                                status="negative"
                            />
                        </div>
                    )
                }
            </main>
        </div>
    )
}