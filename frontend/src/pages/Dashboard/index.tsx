import { useState } from "react";
import { BigNumber, HourTable, MonthSelector, MyPunch, TabPane } from "../../components"
import { HourPointProps } from "../../components/HourTable/HourPoint";
import { WarningType } from "../../components/HourTable/WarningTag";

import styles from './styles.module.scss';

export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('days');

    const handleTabChange = (tabKey: string) => {
        setActiveTab(tabKey);
    }

    const hourPoints: HourPointProps[] = [
        {
            date: new Date(),
            scaleId: '12',
            situations: [
                {
                    hour: '08:00',
                    description: 'Situação',
                    status: 'normal'
                }
            ],
            warnings: [
                {
                    description: 'Expira em 2 dias',
                    type: WarningType.POSITIVE
                }
            ]
        },
        {
            date: new Date(),
            scaleId: '12',
            annotation: '08:00 12:00 13:00 18:20',
            situations: [
                {
                    hour: '08:00',
                    description: '01 Trabalhando',
                    status: 'normal'
                },
                {
                    hour: '01:20',
                    description: '02 Crédito BH',
                    status: 'wrong'
                }
            ],
            warnings: [
                {
                    description: 'Com o Gestor',
                    type: WarningType.NEUTRAL
                }
            ]
        },
        {
            date: new Date(),
            scaleId: '12',
            warnings: [
                {
                    description: 'Expirado',
                    type: WarningType.NEGATIVE
                }
            ]
        }
    ]

    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <MyPunch
                    name="Ryan Gomes"
                    sector="Administração"
                    registration="5233"
                    scale="12 - 08h-12h/13h-17h"
                    office="Matriz - Criciúma/SC"
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
                            data={hourPoints.filter(({ warnings }) => warnings && warnings.every( w => w.type === WarningType.POSITIVE) && warnings.length > 0)}
                        />
                    )
                }

                {
                    activeTab === 'total' && (
                        <div className={styles.bigNumberContainer}>
                            <BigNumber
                                label="Saldo do Banco"
                                value="00:21"
                                status="neutral"
                            />
                            <BigNumber
                                label="Crédito Banco"
                                value="01:20"
                                status="positive"
                            />
                            <BigNumber
                                label="Débito Banco"
                                value="00:00"
                                status="negative"
                            />
                        </div>
                    )
                }
            </main>
        </div>
    )
}