import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './Styles/Connexion.css'
import { Toast } from './TitleAndMessageNotification '
import { ToastApprouved } from './TitleAndMessageNotificationApprouved'

function Connexion({childConnected, childSetConnected, setRegister}){

    const [userConnect, setUserConnect] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory();

    function onChangeUserConnected(e){
        const name = e.target.name;
        const value = e.target.value;
        setUserConnect({...userConnect, [name]: value})
    }

    function submitConnect(e){
        e.preventDefault();
            setSubmitted(true);
        fetch('http://localhost/Back-end/connexion.php', {
            method: 'POST',
            body: JSON.stringify({
                userConnect
            })
            })
            .then(res => res.json())
            .then(data => childSetConnected(data))
    }
    if(childConnected.connected){
        history.push('/Home');
    }

    return(
            <div className="login">
                            <div className="heading">
                            {/*submitted && childConnected.connected ? <div><ToastApprouved/></div>  : submitted && !childConnected.connected ? <div><Toast/></div> : null*/}
                                <h2>Connexion</h2>
                                <div className="form" style={{height:'auto'}}>
                                    <form onSubmit={submitConnect}>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input type="text" className="form-control" placeholder="Nom d'utilisateur ou email" name="pseudo" onChange={onChangeUserConnected} autoComplete="off"/>
                                        </div>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                            <input type="password" className="form-control" placeholder="Mot de passe" name="mdp" onChange={onChangeUserConnected} autoComplete="off"/>
                                        </div>

                                        <button type="submit" className="float" name="">Se connecter</button>
                                    </form>
                                </div>

                                <div className="container-asking">
                                    <a href={null} onClick={() => setRegister(true)} className='ask-registering' style={{color:"white"}}>Toujours pas inscrit ?</a>
                                    <a href={null} className='ask-forget-password' style={{color:"white"}}>Mot de passe oublié ?</a>
                                </div>
                            </div>
                    </div>
    )
}

export default Connexion