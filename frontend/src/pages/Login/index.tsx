import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// components
import { Logo } from '../../components';
import { Button, Input } from '../../components/UI'
import { ArrowRightIcon } from '../../components/Icons'

// assets
import HappyMan from '../../assets/happy-man.png'
import Clock from '../../assets/clock.png'
import Clipboard from '../../assets/clipboard.png'

import styles from './styles.module.scss'
import { cpfMask } from '../../utils';

export function Login() {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    const { handleLogin } = useAuth();

    const handleChangeCode = (value: string) => {
        setCode(cpfMask(value))
    }

    return (
        <div className={styles.page}>
            <section className={styles.loginForm}>
                <main>
                    <header>
                        <Logo size='medium' />
                        <h1>Bem-vindo de volta 👋</h1>
                    </header>
                    <form>
                        <Input
                            placeholder='CPF'
                            type='text'
                            autoComplete='username'
                            value={code}
                            onChange={(e) => handleChangeCode(e.target.value)}
                        />
                        <Input
                            placeholder='Senha'
                            type='password'
                            autoComplete='current-password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={() => handleLogin({ code, password })}>
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
                        <img src={Clock} alt="Clock icon." />
                    </div>
                    <div className={styles.popIcon} id={styles.clipboard}>
                        <img src={Clipboard} alt="Clipboard icon." />
                    </div>
                </div>
            </section>
        </div>
    )
}