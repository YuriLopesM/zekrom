import styles from './styles.module.scss';	

interface LogoProps {
    size?: 'small' | 'medium' | 'large',
    type?: 'text' | 'logo'
}

export const Logo = ({
    size = 'medium',
    type = 'text'
}: LogoProps) => {
    const remSize = {
        small: '1.5rem',
        medium: '2rem',
        large: '4rem'
    }

    return (
        {
            text: (
                <h1
                    className={styles.textLogo}
                    style={{ fontSize: remSize[size] }}
                >
                    <span>Ze</span>kron
                </h1>
            ),
            logo: (
                <h1
                    className={styles.logo}
                    style={{ fontSize: remSize[size] }}
                >
                    Z<span>.</span>
                </h1>
            )
        }[type] || <></>
    )
}