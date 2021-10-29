import { useContext, useState } from 'react';
import { connectedContext } from './MyContexts';
import { demandeContext } from './MyContexts';
import './Styles/NavHomeClient.css'

function NavHomeClient({setNavClient, childInfoDemande, childSetInfoDemande, childConnected}){

    
    return(
        <div class="container teal anim">
            <a onClick={() => setNavClient("HOME")}>HOME</a>
            <a onClick={() => setNavClient("REPARATION")}>REPARATION</a>
            <a onClick={() => setNavClient("GETDEMANDE")}>MES DEMANDES</a>
            <a>INFOS ET TARIFS</a>
        </div>
    )
}

export default NavHomeClient