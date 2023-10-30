import styles from "./styles.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    
}

export const Button = ({ 
    ...props
}: ButtonProps) => {
    return (
        <button 
            className={styles.buttonContainer} 
            {...props}
        >
            {props.children}
        </button>
    )
}