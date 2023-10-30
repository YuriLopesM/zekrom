import { MonthSelector, MyPunch } from "../../components"

import styles from './styles.module.scss';

export const Dashboard = () => {
    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <MyPunch />
                <MonthSelector />
            </section>
        </div>
    )
}