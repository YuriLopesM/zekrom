import styles from "./styles.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    ghost?: boolean;
    onlyIcon?: boolean;
}

export const Button = ({ 
    ...props
}: ButtonProps) => {
    const isGhost = props.ghost ? styles.ghost : styles.primary;
    const isOnlyIcon = props.onlyIcon ? styles.onlyIcon : '';

    return (
        <button 
            className={`${styles.buttonContainer} ${isGhost} ${isOnlyIcon}`} 
            {...props}
        >
            {props.children}
        </button>
    )
}