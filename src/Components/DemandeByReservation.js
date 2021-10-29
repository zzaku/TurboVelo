import Repararer from "../Routes/Reparer"
import { useHistory } from "react-router"
import pneu from "./Assets/pneu.png"
import frein from "./Assets/frein.png"
import revision from "./Assets/revision.jpg"
import autre from "./Assets/autre.png"
import {UserWorker, LinkPrevious, Send, StatusGoodSmall}  from "grommet-icons"
import {AiOutlineCheckCircle, AiOutlineClockCircle} from 'react-icons/ai'
import {GrUpdate} from 'react-icons/gr'
import {MdDeleteForever} from 'react-icons/md'
import { connectedContext } from "./MyContexts"
import { useContext, useEffect, useState } from "react"
import UpdateDemande from "./UpdateDemande"
import './Styles/ListDemande.css'
import './Styles/DemandeByReservation.css'

function DemandeByReservation({IdService, demandeByReservation, setDemandeByReservation, setIsVisibleDemandeByReservation}){

    const current_id = useContext(connectedContext);

    const [isDemandeVisible, setIsDemandeVisible] = useState(false)
    const [infoVisible, setInfoVisible] = useState(false)
    const [idDemande, setIdDemande] = useState({id: current_id})
    const [infoDemande, setInfoDemande] = useState({})
    const [demandeRejectd, setDemandeRejectd] = useState({})
    const [demandeConfirmed, setDemandeConfirmed] = useState({})
    const [isVisibleDemandeConfirmed, setIsVisivbleDemandeConfirmed] = useState(false)
    console.log('la confirmation : ', demandeConfirmed)

    useEffect(() => {
        fetch('http://localhost/Back-end/DemandeByReservation.php',{
            method: 'POST',
            body: JSON.stringify({
                IdService
            })
        }).then(res => res.json())
        .then(data => setDemandeByReservation(data))
}, [demandeByReservation])

    function ConfirmDemande(idOfService){
        if(idOfService === IdService){
            fetch('http://localhost/Back-end/ConfirmDemandeByReservation.php',{
                method: 'POST',
                body: JSON.stringify({
                    idOfService
                })
            }).then(res => res.json())
            .then(data => setDemandeConfirmed(data))
        }
    }

    function RejectDemande(){
                    fetch('http://localhost/Back-end/RejectDemandeByReservation.php',{
                        method: 'POST',
                        body: JSON.stringify({
                            IdService
                        })
                    }).then(res => res.json())
                    .then(data => setDemandeRejectd(data))
    }
        
        return(
            
            <div className="list-item" style={{alignItems:"center"}} id="">
                <>
                    
                        {demandeByReservation.successGetDemandeByReservation ? <>
                          <div className="Titre" style={{width:'100%', height:"10%",display:'flex',justifyContent:'center', alignItems:'center'}}> CATEGORIE :   {demandeByReservation.resultat[0].Titre}</div>
                                {demandeByReservation.resultat.map((call) => (
                                    <div id="tv" style={{listStyle:"none", textAlign:"center"}}>
                                        
                                            {!isDemandeVisible ? <>
                                                
                                                    {<div className="item" style={{cursor:"pointer"}} > 
                                                        {call.Etat === 'accepte' ? <AiOutlineCheckCircle style={{backgroundColor:"green", borderRadius:"20px"}} /> 
                                                        : call.Etat === 'analyse' ? <AiOutlineClockCircle style={{backgroundColor:"orange", borderRadius:"20px"}} /> : null}
                                                        <li>Nom : {call.Nom} {call.Prenom}</li><br></br>
                                                        <li>Adresse : {call.Adresse}</li><br></br>
                                                        <li>Date d'intervention : {call.Date_demande}</li><br></br>
                                                        <li>Sujet : {call.Sujet}</li><br></br>
                                                        <li>Date de création de la demande : {call.Date_intervention}</li><br></br>
                                                        <li>Etat de la demande : {call.Etat === 'analyse' ? <>en traitement</> : call.Etat === 'accepte' && <> accepté </>}</li>
                                                        <br></br>
                                                        {call.Etat === 'analyse' && <div className="confirm-or-delete-demande">
                                                            <button class="button btn-3"  style={{width:"40%", height:"4em"}} onClick={() => ConfirmDemande(call.Id_service)} > ACCEPTER </button>
                                                            <button class="button btn-3"  style={{width:"40%", height:"4em"}} > REJETER </button>
                                                        </div>}
                                                        
                                                    </div>
                                                    }
                                                </> :  
                                            <div class="flex-1" style={{textAlign:"end"}}><button class="button btn-3" style={{width:"90%", height:"100%"}} onClick={() => getById(call.Id_demande)} >Voir ma demande </button></div>} 
                                            <div className="bloc-button"><button className="button btn-3" onClick={() => setIsVisibleDemandeByReservation(false)}>Retour</button></div>
                                    </div>
                                ))}
                            </> : <div className='not_found_demande' style={{display:"flex" ,flexDirection:"column" ,justifyContent:"center", alignItems:"center", height:"100%", width:"100%"}}> Aucune demande n'a été faite pour ce service !<div className="bloc-button"><button className="button btn-3" onClick={() => setIsVisibleDemandeByReservation(false)} >Retour</button></div></div>}
                        </>
            </div> 
        )

        function getById(id){
            infoDemande.resultat.forEach(element => {
            let myIdDemande = element.Id_demande
                if(myIdDemande === id){
                    
                    setIsDemandeVisible(isDemandeVisible === isDemandeVisible && !isDemandeVisible);
                }
                
            });
        }
}

export default DemandeByReservation