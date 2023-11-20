import style from './styles.module.scss';

interface BigNumberProps {
    label: string;
    value: string;
    status: 'positive' | 'negative' | 'neutral';
}

export const BigNumber = ({
    label,
    value,
    status
}: BigNumberProps) => {
    const statusColor = {
        positive: {
            color: '#61C092'
        },
        negative: {
            color: '#C06161'
        },
        neutral: {
            color: '#61C0BF'
        }
    }

    return (
        <div className={style.container} style={statusColor[status]}>
            <h3>{label}</h3>
            <p>{value}</p>
        </div>
    )
}