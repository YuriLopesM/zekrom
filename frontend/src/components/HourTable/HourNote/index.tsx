import styles from './styles.module.scss';

interface HourNoteProps {
    text?: string;
}

export const HourNote = ({
    text    
}: HourNoteProps) => {
    return (
        <>
            {
                text
                    ? <p className={styles.withHour}>{text}</p>
                    : <p className={styles.addHour}>Inserir anotação</p>
            }
        </>
    )
}