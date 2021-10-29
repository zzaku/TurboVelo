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

function ListDemande({childConnected}){

    const current_id = useContext(connectedContext);

    const [isDemandeVisible, setIsDemandeVisible] = useState(false)
    const [infoVisible, setInfoVisible] = useState(false)
    const [idDemande, setIdDemande] = useState({id: current_id})
    const [infoDemande, setInfoDemande] = useState({})
    const [demandeDeleted, setDemandeDeleted] = useState({})
    const [isVisibleDemandeUpdated, setIsVisibleDemandeUpdated] = useState(false)
    console.log("les datas que j'envoie : ", current_id)
    console.log("les datas que je reçois : ", infoDemande)
    console.log(infoDemande)

    useEffect(() => {
        fetch('http://localhost/Back-end/GetDemande.php',{
            method: 'POST',
            body: JSON.stringify({
                idDemande
            })
        })
        .then(res => res.json())
        .then(data => setInfoDemande(data))
    }, [idDemande,  infoDemande])

    function DeleteDemande(id){
        infoDemande.resultat.forEach(element => {
            let myIdDemande = element.Id_demande
                if(myIdDemande === id){
                    fetch('http://localhost/Back-end/DeleteDemande.php',{
                        method: 'POST',
                        body: JSON.stringify({
                            myIdDemande
                        })
                    }).then(res => res.json())
                    .then(data => setDemandeDeleted(data))
                }
            });
    }

    
        
        return(
            
            <div className="list-item" style={{alignItems:"center"}} id="">
                <>
                    {childConnected.connected ?<>
                        {infoDemande.successGetDemande ? <>
                            
                                {infoDemande.resultat.map((call) => (
                                    <div id="tv" style={{listStyle:"none", textAlign:"center"}}>
                                        {!isVisibleDemandeUpdated ? <>
                                            {!isDemandeVisible ? <>
                                                
                                                    {<div className="item" style={{cursor:"pointer"}} onClick={() => getById(call.Id_demande)} > 
                                                        {call.Etat === 'accepte' ? <AiOutlineCheckCircle style={{backgroundColor:"green", borderRadius:"20px"}} /> 
                                                        : call.Etat === 'analyse' ? <AiOutlineClockCircle style={{backgroundColor:"orange", borderRadius:"20px"}} /> : null}
                                                        <li>Adresse : {call.Adresse}</li><br></br>
                                                        <li>Date d'intervention : {call.Date_demande}</li><br></br>
                                                        <li>Sujet : {call.Sujet}</li><br></br>
                                                        <li>Date de création de la demande : {call.Date_intervention}</li><br></br>
                                                        <li>Etat de la demande : {call.Etat === 'analyse' ? <>en traitement</> : call.Etat === 'accepte' && <> accepté </>}</li>
                                                        <MdDeleteForever onClick={() => DeleteDemande(call.Id_demande)} className="delete" style={{color:"red", width:"7%", height:"7%", borderRadius:"20px"}}/><GrUpdate onClick={() => setIsVisibleDemandeUpdated(true) } className="update" style={{color:"maroon", width:"7%", height:"7%", borderRadius:"3px"}}/>
                                                        
                                                    </div>
                                                    }
                                                </> :  
                                            <div class="flex-1" style={{textAlign:"end"}}><button class="button btn-3" style={{width:"90%", height:"100%"}} onClick={() => getById(call.Id_demande)} >Voir ma demande </button></div>} </> : 
                                            <> <UpdateDemande infoDemande={infoDemande} update={call.Id_demande} setIsVisibleDemandeUpdated={setIsVisibleDemandeUpdated}/> </>}
                                    </div>
                                ))}
                            </> : <div className='not_found_demande' style={{display:"flex" ,justifyContent:"center", alignItems:"center", height:"100%", width:"100%"}}> Aucune demande n'a été faite </div>
                        } </> :
                        <div className='not_connected' style={{display:"flex" ,justifyContent:"center", alignItems:"center", height:"100%", width:"100%"}}>Connectez-vous pour de pouvoir consulter vos demandes</div>
                    }
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

export default ListDemande