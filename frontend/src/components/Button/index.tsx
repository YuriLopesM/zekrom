import "./styles.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    
}

export const Button = ({ 
    ...props
}: ButtonProps) => {
    return (
        <button {...props}>{props.children}</button>
    )
}