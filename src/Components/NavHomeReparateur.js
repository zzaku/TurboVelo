import { useContext, useState } from 'react';
import { connectedContext } from './MyContexts';
import { demandeContext } from './MyContexts';
import './Styles/NavHomeClient.css'

function NavHomeReparateur({setNavReparateur, childInfoDemande, childSetInfoDemande, childConnected}){

    
    return(
        <div class="container teal anim">
            <a onClick={() => setNavReparateur("HOME")}>HOME</a>
            <a onClick={() => setNavReparateur("AddDService")}>AJOUTER UN SERVICE</a>
            <a onClick={() => setNavReparateur("Services")}>MES SERVICE</a>
            <a>INFOS ET TARIFS</a>
        </div>
    )
}

export default NavHomeReparateur