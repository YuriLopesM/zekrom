import { Button, Input, Logo } from '../../components'
import { ArrowRightIcon } from '../../components/Icons'

import { useNavigate } from "react-router-dom";

// assets
import HappyMan from '../../assets/happy-man.png'
import Clock from '../../assets/clock.png'
import Clipboard from '../../assets/clipboard.png'

import './styles.scss'

export function Login() {
    const navigate = useNavigate();

    return (
        <div className="loginPage">
            <section className="loginForm">
                <main>
                    <header>
                        <Logo size='medium'/>
                        <h1>Bem-vindo de volta 👋</h1>
                    </header>
                    <form>
                        <Input placeholder='CPF' type='text'/>
                        <Input placeholder='Senha' type='password' />
                        <Button onClick={() => navigate("/dashboard")}>
                            <span>
                                Entrar
                                <ArrowRightIcon />
                            </span>
                        </Button>
                    </form>
                </main>
            </section>
            <section className="hero">
                <div className="heroBoxBg">
                    <img 
                        id="heroManImg"
                        src={HappyMan}
                        alt="Happy man with a smartphone and tablet."
                    />
                    <div className="popIcon" id="clock">
                        <img src={Clock} alt="Clock icon."/>
                    </div>
                    <div className="popIcon" id="clipboard">
                        <img src={Clipboard} alt="Clipboard icon."/>
                    </div>
                </div>
            </section>
        </div>
    )
}