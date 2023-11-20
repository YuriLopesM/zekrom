import { useState } from 'react';
import { Button } from '..';

import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '../Icons';
import styles from './styles.module.scss';

export const MonthSelector = () => {
    const [date, setDate] = useState(new Date());

    const month =
        date.toLocaleString('pt-BR', {
            month: 'long'
        })
            .toString()
            .toUpperCase()
            .slice(0, 3);
    const year = date.getFullYear();

    const handleAddMonth = () => {
        setDate(new Date(date.setMonth(date.getMonth() + 1)));
    }

    const handleSubtractMonth = () => {
        setDate(new Date(date.setMonth(date.getMonth() - 1)));
    }

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const formattedFirstDay = firstDay.toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'numeric'
    });

    const formattedLastDay = lastDay.toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'numeric'
    });

    return (
        <div className={styles.container}>
            <div className={styles.month}>
                <CalendarIcon />
                <p>{month} {year}</p>
            </div>
            <div className={styles.selectDate}>
                <Button
                    ghost={true}
                    onlyIcon={true}
                    onClick={handleSubtractMonth}
                >
                    <ChevronLeftIcon />
                </Button>
                <p>{formattedFirstDay} a {formattedLastDay}</p>
                <Button
                    ghost={true}
                    onlyIcon={true}
                    onClick={handleAddMonth}
                >
                    <ChevronRightIcon />
                </Button>
            </div>
        </div>
    )
}