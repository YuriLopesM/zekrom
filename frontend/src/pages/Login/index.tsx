import { Button, Input, Logo } from '../../components'
import { ArrowRightIcon } from '../../components/Icons'

import { useNavigate } from "react-router-dom";

// assets
import HappyMan from '../../assets/happy-man.png'
import Clock from '../../assets/clock.png'
import Clipboard from '../../assets/clipboard.png'

import styles from './styles.module.scss'

export function Login() {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <section className={styles.loginForm}>
                <main>
                    <header>
                        <Logo size='medium'/>
                        <h1>Bem-vindo de volta 👋</h1>
                    </header>
                    <form>
                        <Input
                            placeholder='CPF'
                            type='text'
                            autoComplete='username'
                        />
                        <Input 
                            placeholder='Senha' 
                            type='password'
                            autoComplete='current-password'
                        />
                        <Button onClick={() => navigate("/dashboard")}>
                            <span>
                                Entrar
                                <ArrowRightIcon />
                            </span>
                        </Button>
                    </form>
                </main>
            </section>
            <section className={styles.hero}>
                <div className={styles.heroBoxBg}>
                    <img 
                        id={styles.heroManImg}
                        src={HappyMan}
                        alt="Happy man with a smartphone and tablet."
                    />
                    <div className={styles.popIcon} id={styles.clock}>
                        <img src={Clock} alt="Clock icon."/>
                    </div>
                    <div className={styles.popIcon} id={styles.clipboard}>
                        <img src={Clipboard} alt="Clipboard icon."/>
                    </div>
                </div>
            </section>
        </div>
    )
}