import styles from './styles.module.scss';	

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{

}

export const Input = ({
    ...rest
}: InputProps) => {
    return (
        <input className={styles.inputContainer} {...rest}/>
    )
}