import { useEffect, useState } from "react";

import { BigNumber, HourTable, MonthSelector, MyPunch } from "../../components"
import ReactModal from 'react-modal';
import { Button, Input, TabPane } from "../../components/UI";

import { MonthlyData, UserData, WarningType } from "../../types";

import styles from './styles.module.scss';
import { useFakeData } from "../../context/FakeDataContext";
import { useAuth } from "../../context/AuthContext";
import { filterBySelectedDate } from "../../utils";
import dayjs from "dayjs";

interface MonthlyDataFormatted extends Omit<MonthlyData, 'date'> {
    user: UserData;
}

export const Dashboard = () => {
    const { user: userAuthenticated } = useAuth()
    const {
        hourPoints,
        data,
        selectedDate,
        isModalOpen,
        newAnnotation,
        handleCloseAnnotationModal,
        handleAddPunchValue,
        handleAddNewAnnotation
    } = useFakeData()

    const [activeTab, setActiveTab] = useState('days');
    const [userMonthlyData, setUserMonthlyData] = useState<MonthlyDataFormatted>({} as MonthlyDataFormatted);

    useEffect(() => {
        const monthlyData: MonthlyDataFormatted[] = data.map(({ monthlyData, user }) => {
            if (!monthlyData) return {} as MonthlyDataFormatted

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
            return user?.id === userAuthenticated?.id
        })[0]

        setUserMonthlyData(formattedUserMonthlyData)
    }, [data, userAuthenticated])

    const handleTabChange = (tabKey: string) => {
        setActiveTab(tabKey);
    }

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
                                value={userMonthlyData.monthBalance || '00:00'}
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

                <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseAnnotationModal}
                    preventScroll={true}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        },
                        content: {
                            top: '150px',
                            left: '700px',
                            right: '700px',
                            bottom: '200px',
                            border: 'none',
                            borderRadius: '16px',
                            background: '#F2F2F2',
                            padding: '32px',
                        }
                    }}
                >
                    <main className={styles.modalContainer}>
                        <h3>Adicionar anotação - {`${dayjs(newAnnotation?.date).format('DD/MM/YYYY')}`}</h3>
                        <section>
                            <div className={styles.inputField}>
                                <label htmlFor="fstPunch">Primeira marcação</label>
                                <Input
                                    value={newAnnotation?.firstPunch}
                                    type="time"
                                    id="firstPunch"
                                    onChange={(e) => handleAddPunchValue(e.currentTarget.id, e.currentTarget.value)}
                                />
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor="sndPunch">Segunda marcação</label>
                                <Input
                                    value={newAnnotation?.secondPunch}
                                    type="time"
                                    id="secondPunch"
                                    onChange={(e) => handleAddPunchValue(e.currentTarget.id, e.currentTarget.value)}
                                />
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor="trdPunch">Terceira marcação</label>
                                <Input
                                    value={newAnnotation?.thirdPunch}
                                    type="time"
                                    id="thirdPunch"
                                    onChange={(e) => handleAddPunchValue(e.currentTarget.id, e.currentTarget.value)}
                                />
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor="fthPunch">Quarta marcação</label>
                                <Input
                                    value={newAnnotation?.fourthPunch}
                                    type="time"
                                    id="fourthPunch"
                                    onChange={(e) => handleAddPunchValue(e.currentTarget.id, e.currentTarget.value)}
                                />
                            </div>
                        </section>
                        <Button onClick={handleAddNewAnnotation}>Adicionar marcação</Button>
                    </main>
                </ReactModal>
            </main>
        </div>
    )
}