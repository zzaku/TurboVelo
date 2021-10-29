import logo from './Assets/velrep.png'
import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './Nav'
import { useState } from 'react'
import './Styles/Navbar.css'


function Navbar({connected, reparateur, setReparateur}){

    function backToReparateur(){
        fetch('http://localhost/Back-end/BackToReparateur.php', {
            method: 'POST',
            body: JSON.stringify({
                connected
            })
            })
            .then(res => res.json())
            .then(data => setReparateur(data))
    }

    function backToClient(){
        fetch('http://localhost/Back-end/BackToClient.php', {
            method: 'POST',
            body: JSON.stringify({
                connected
            })
            })
            .then(res => res.json())
            .then(data => setReparateur(data))
    }
        

    const [divBars, setDivBars] = useState(false)
    

    const nav_logo = <NavLink to='/' >
                        <img src={logo} className="App-logo" alt="logo" style={{height:152, width:152}}/>
                    </NavLink>
    
    const nav_about = reparateur.status !== 'reparateur' ? <NavLink to='/Home' >
                         RESERVE UNE REPARATION
                    </NavLink> : <NavLink to='/Reparer' >
                         PROPOSER DES SERVICES
                    </NavLink>

    const nav_reservation = reparateur.status !== 'reparateur' ? <NavLink to='/Reservation' >
                                Mes réservations
                        </NavLink> : <NavLink to='/Service' >
                            Mes services
                        </NavLink> 

    const nav_reparateur = reparateur.status !== 'reparateur' && connected.connected && !reparateur.alreadyReparateur? <NavBtn >
                            <NavBtnLink to='/Reparation' onClick={() => backToReparateur()}>Devenir réparateur</NavBtnLink>
                        </NavBtn> : connected.status !== 'reparateur' && !connected.connected ? null : !reparateur.backToClient  ?<NavBtn >
                            <NavBtnLink to='/Home' onClick={() => backToClient()}>Espace client</NavBtnLink>
                        </NavBtn> : null

    const nav_connexion = !connected.connected ? <NavBtn >
                            <NavBtnLink to='/Connexion'>Connexion</NavBtnLink>
                        </NavBtn> : <NavBtn >
                            <NavBtnLink to='/Profil'>Mon profil</NavBtnLink>
                        </NavBtn>

    const ongletBars = <div className="fa-bars-text"> {nav_connexion} {nav_reparateur} {nav_reservation} {nav_about} </div>


    return(
            <>  
                <Nav>
                    {nav_logo}
                    
                    <Bars  onClick={() => setDivBars(divBars === divBars && !divBars)} />
                    {divBars ? ongletBars : null}

                    <NavMenu>
                        {nav_about}
                        {nav_reservation}
                    </NavMenu>

                    <NavMenu>
                        {nav_reparateur}
                        {nav_connexion}
                    </NavMenu>
                </Nav>
            </>
    )
}

export default Navbar
