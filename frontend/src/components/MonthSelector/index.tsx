import { 
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '../Icons';
import styles from './styles.module.scss';

export const MonthSelector = () => {
    return (
        <div className={styles.container}>
            <div className={styles.month}>
                <CalendarIcon />
                <p>OUT 2023</p>
            </div>
            <div className={styles.selectDate}>
                <ChevronLeftIcon />
                <p>01/10 a 31/10</p>
                <ChevronRightIcon />
            </div>
        </div>
    )
}