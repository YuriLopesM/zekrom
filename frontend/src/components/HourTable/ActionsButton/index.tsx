import styles from './styles.module.scss';

interface ActionsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
}

export const ActionsButton = ({
    ...props
}: ActionsButtonProps) => {
    return (
        <button 
            {...props}
            className={styles.buttonContainer}
        >
            {props.children}
        </button>
    )
}