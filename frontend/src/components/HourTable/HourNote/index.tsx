import dayjs from 'dayjs';
import { useFakeData } from '../../../context/FakeDataContext';
import { Annotation } from '../../../types';
import styles from './styles.module.scss';

interface HourNoteProps {
    date: Date;
    annotation?: Annotation;
}

export const HourNote = ({
    annotation,
    date
}: HourNoteProps) => {
    const { handleOpenAnnotationModal } = useFakeData()
    const isNotExpired = dayjs(date).diff(new Date(), 'day') > -7

    return (
        <>
            {
                !isNotExpired
                    ? <p className={styles.expired}>Bloqueado</p>
                    :
                    (
                        annotation && Object.values(annotation).length > 0
                            ? <p className={styles.withHour}>{`${annotation?.firstPunch} - ${annotation?.secondPunch} - ${annotation?.thirdPunch} - ${annotation?.fourthPunch}`}</p>
                            : <p className={styles.addHour} onClick={() => handleOpenAnnotationModal(date)}>Inserir anotação</p>
                    )
            }
        </>
    )
}