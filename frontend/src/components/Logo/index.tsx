import styles from './styles.module.scss';	

interface LogoProps {
    size?: 'small' | 'medium' | 'large'
}

export const Logo = ({
    size = 'medium'
}: LogoProps) => {
    const remSize = {
        small: '1.5rem',
        medium: '2rem',
        large: '4rem'
    }

    return (
        <h2 
            className={styles.logo} 
            style={{ fontSize: remSize[size]}}
        >
            Ze<span>kron</span>
        </h2>
    )
}