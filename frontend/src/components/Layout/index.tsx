import { MainHeader } from "..";
import { Outlet } from "react-router-dom";

import styles from './styles.module.scss'



interface LayoutProps {
}

export const Layout = ({}: LayoutProps) => {
    return (
        <div className={styles.container}>
            <MainHeader />
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    )
}