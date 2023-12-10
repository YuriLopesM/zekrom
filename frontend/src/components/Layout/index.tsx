import { MainHeader, Navbar } from "..";
import { Outlet } from "react-router-dom";

import styles from './styles.module.scss'

interface LayoutProps {
}

export const Layout = ({}: LayoutProps) => {
    return (
        <div className={styles.container}>
            <MainHeader />
            <Navbar />
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    )
}