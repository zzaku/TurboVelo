import { useEffect, useState } from 'react'
import passwordHash  from 'password-hash'
import { useHistory } from 'react-router-dom'
import './Styles/Connexion.css'

import { Toast } from './TitleAndMessageNotification '
import { ToastApprouved } from './TitleAndMessageNotificationApprouved'


function Inscription({setRegister}){
    
    const [user, setUser] = useState({})
    const [inscription, setInscription] = useState({})
    const [visible, setVisible] = useState(false);
    

    const onOpen = () => setVisible(true);
    const onClose = () => setVisible(undefined);

    function onChangeUser(e){
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]: value})
    }
 
    function submitInscription(){
        fetch('http://localhost/Back-end/inscription.php', {
            method: 'POST',
            body: JSON.stringify({
                user
            })
        }).then(res => res.json())
        .then(data => setInscription(data))
        
     }

     if(inscription.successInscription){
        setTimeout(function(){
            window.location.reload();
        },4000);
     }

     
     console.log(inscription)
     console.log("les info que j'inscris et que j'envoie : ",user)

    return(
        <div className="login">
                        <div className="heading">
                            {inscription.pseudoExisting && <div><Toast/></div>}
                            {inscription.successInscription && <div><ToastApprouved/></div>}
                            <h2>Inscription</h2>
                                <div className="form" style={{height:'100%'}}>
                                   <form action=''>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input type="text" className="form-control" placeholder="Prénom" name="prenom" onChange={onChangeUser} autoComplete="off"/>
                                        </div>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input type="text" className="form-control" placeholder="Nom" name="nom" onChange={onChangeUser} autoComplete="off" required/>
                                        </div>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input type="text" className="form-control" placeholder="Nom d'utilisateur" name="pseudo" onChange={onChangeUser} autoComplete="off" required/>
                                        </div>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input type="text" className="form-control" placeholder="Adresse mail" pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,10}" name="mail" onChange={onChangeUser} autoComplete="off" required />
                                        </div>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input type="tel" className="form-control" placeholder="Numéro de téléphone" pattern="[0-9]{10}" name="tel" onChange={onChangeUser} autoComplete="off" required />
                                        </div>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input type="text" className="form-control" placeholder="Adresse" name="adresse" onChange={onChangeUser} autoComplete="off" required />
                                        </div>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                            <input type="password" className="form-control" placeholder="Mot de passe" minLength="8" name="password" onChange={onChangeUser} autoComplete="off" required/>
                                        </div>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                            <input type="password" className="form-control" placeholder="Confirmer le mot de passe" minLength="8" name="passwordcheck" onChange={onChangeUser} autoComplete="off" required/>
                                        </div>

                                        <button disabled={user.password === user.passwordcheck ? false : true}  className="float" name="" onClick={() => submitInscription()}>S'inscrire</button>
                                    </form>
                                </div>

                            <div className="container-asking">
                                <a href={null} onClick={() => setRegister(false)} className='ask-registering' style={{color:"white"}}>Se connecter</a>
                            </div>
                        </div>
                </div>
    )
}

export default Inscription


