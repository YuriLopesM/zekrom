import styles from './styles.module.scss';

export interface TabProps {
    isActive?: boolean;
    label: string;
    tabKey: string;
    handleTabChange: (tabKey: string) => void;
}

export const Tab = ({
    isActive = false,
    label,
    tabKey,
    handleTabChange
}: TabProps) => {
    const activeClassname = isActive ? styles.active : '';

    return (
        <div 
            className={`${styles.tabContainer} ${activeClassname}`}
            onClick={() => handleTabChange(tabKey)}
        >
            <p>{ label.toUpperCase() }</p>
        </div>
    )
}