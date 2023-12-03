import styles from "./styles.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    ghost?: boolean;
    onlyIcon?: boolean;
}

export const Button = ({ 
    ghost,
    onlyIcon,
    ...props
}: ButtonProps) => {
    const isGhost = ghost ? styles.ghost : styles.primary;
    const isOnlyIcon = onlyIcon ? styles.onlyIcon : '';

    return (
        <button 
            className={`${styles.buttonContainer} ${isGhost} ${isOnlyIcon}`} 
            {...props}
        >
            {props.children}
        </button>
    )
}