import { Tab } from './Tab';
import styles from './styles.module.scss';

interface TabsProps {
    activeTab: string;
    tabs: {
        tabKey: string;
        label: string;
    }[];
    handleTabChange: (tabKey: string) => void;
}

export const TabPane = ({
    activeTab,
    tabs,
    handleTabChange
}: TabsProps) => {
    return (
        <section className={styles.tabPaneContainer}>
            {
                tabs.map(({
                    tabKey,
                    label
                }) => (
                    <Tab
                        key={tabKey}
                        tabKey={tabKey}
                        label={label}
                        isActive={activeTab === tabKey}
                        handleTabChange={handleTabChange}
                    />
                ))
            }
        </section>
    )
}
