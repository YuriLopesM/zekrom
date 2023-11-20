import { HourPoint, HourPointProps } from "./HourPoint"

import styles from "./styles.module.scss"

interface HourTableProps {
    data: HourPointProps[];
}

export const HourTable = ({
    data
}: HourTableProps) => {
    return (
        <main className={styles.tableContainer}>
            <header className={styles.tableHeader}>
                <p>DATA</p>
                <p>HORÁRIO</p>
                <p>ANOTAÇÕES</p>
                <p>SITUAÇÕES</p>
                <p>AVISOS</p>
            </header>
            <section>
                {
                    data.map(hourPoint => {
                        return (
                            <HourPoint
                                date={hourPoint.date}
                                scaleId={hourPoint.scaleId}
                                annotation={hourPoint.annotation}
                                situations={hourPoint.situations}
                                warnings={hourPoint.warnings}
                            />
                        )
                    })
                }
            </section>
        </main>
    )
}