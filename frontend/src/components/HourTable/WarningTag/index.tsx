import { IWarning, WarningType } from '../../../types';
import styles from './styles.module.scss';

export const WarningTag = ({
    description,
    type = WarningType.NEUTRAL
}: IWarning) => {
    const warningColor = {
        positive: {
            color: '#FFF',
            background: '#61C092'
        },
        negative: {
            color: '#FFF',
            background: '#C06161'
        },
        neutral: {
            color: '#333',
            background: '#E5E5E5'
        }
    }

    return (
        <div className={styles.warningTagContainer} style={warningColor[type]}>
            <p>{description}</p>
        </div>
    )
}