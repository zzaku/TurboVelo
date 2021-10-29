import Repararer from "../Routes/Reparer"
import { useHistory } from "react-router"
import pneu from "./Assets/pneu.png"
import frein from "./Assets/frein.png"
import revision from "./Assets/revision.jpg"
import autre from "./Assets/autre.png"
import { FaCartPlus } from "react-icons/fa"
import {UserWorker, LinkPrevious, Send, StatusGoodSmall}  from "grommet-icons"
import {AiOutlineCheckCircle, AiOutlineClockCircle} from 'react-icons/ai'
import {GrUpdate} from 'react-icons/gr'
import {MdDeleteForever} from 'react-icons/md'
import { connectedContext } from "./MyContexts"
import { useContext, useEffect, useState } from "react"
import { Badge, Toggle} from "framework7-react"
import Switch from 'react-input-switch';
import UpdateService from "./UpdateService"
import DemandeByReservation from "./DemandeByReservation"
import './Styles/ListService.css'

function ListService({childConnected}){

    const current_id = useContext(connectedContext);
    const [toggle, setToggle] = useState(0)
    const [isDemandeVisible, setIsDemandeVisible] = useState(false)
    const [infoVisible, setInfoVisible] = useState(false)
    const [idDemande, setIdDemande] = useState({id: current_id})
    const [infoDemande, setInfoDemande] = useState({})
    const [demandeDeleted, setDemandeDeleted] = useState({})
    const [demandeByReservation, setDemandeByReservation] = useState({id: current_id,})
    const [allDemandeByReservation, setAllDemandeByReservation] = useState({})
    const [IdService, setIdService] = useState({})
    const [isVisibleDemandeUpdated, setIsVisibleDemandeUpdated] = useState(false)
    const [isVisibleDemandeByReservation, setIsVisibleDemandeByReservation] = useState(false)
    const [countNotif, setCountNotif] = useState()
    const [index, setIndex] = useState({})
    console.log(demandeByReservation)

    useEffect(() => {
        fetch('http://localhost/Back-end/GetServices.php',{
            method: 'POST',
            body: JSON.stringify({
                idDemande
            })
        })
        .then(res => res.json())
        .then(data => setInfoDemande(data))
    }, [idDemande]) 

    useEffect(() => {
        fetch('http://localhost/Back-end/AllDemandeByReservation.php',{
            method: 'POST',
            body: JSON.stringify({
                current_id
            })
        }).then(res => res.json())
        .then(data => setAllDemandeByReservation(data))
}, [])

    function DeleteDemande(id){
        infoDemande.resultat.forEach(element => {
            let myIdDemande = element.Id_service
                if(myIdDemande === id){
                    fetch('http://localhost/Back-end/DeleteService.php',{
                        method: 'POST',
                        body: JSON.stringify({
                            myIdDemande
                        })
                    }).then(res => res.json())
                    .then(data => setDemandeDeleted(data))
                }
            });
    }  
        
        return(<>
            
            <div className="list-item" style={{alignItems:"center"}} id="">
                <>
                    {childConnected.connected ?<>
                        {infoDemande.successGetService ? <>
                            {!isVisibleDemandeByReservation ? <>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'10%'}}>
                <div>
                    <label>Activer les notification</label><br></br>
                </div>
                <div>
                    <Switch styles={{
                        track: {
                        backgroundColor: 'white'
                        },
                        trackChecked: {
                        backgroundColor: 'grey'
                        },
                        button: {
                            backgroundColor: 'grey'
                        },
                        buttonChecked: {
                        backgroundColor: 'white'
                        }
                    }} value={toggle} onChange={setToggle} />
                    </div>
            </div>
                                {infoDemande.resultat.map((call) => (
                                    <div id="tv" style={{listStyle:"none", textAlign:"center"}}>
                                        
                                            {!isVisibleDemandeUpdated ? <>
                                                {!isDemandeVisible ? <>
                                                    
                                                        {<div className="item" style={{cursor:"pointer"}} onClick={() => getById(call.Id_service)} > 
                                                            {call.Etat === 'accepte' ? <AiOutlineCheckCircle style={{backgroundColor:"green", borderRadius:"20px"}} /> 
                                                            : call.Etat === 'analyse' ? <AiOutlineClockCircle style={{backgroundColor:"orange", borderRadius:"20px"}} /> : null}
                                                            <li>Titre : {call.Titre}</li><br></br>
                                                            <li>Description : {call.Description}</li><br></br>
                                                            <li>Tarif : {call.Tarif}€</li><br></br>
                                                            <li>Rayon d'intervention : {call.Rayon_intervention}km</li><br></br>
                                                            <MdDeleteForever onClick={() => DeleteDemande(call.Id_service)} className="delete" style={{color:"red", width:"7%", height:"7%", borderRadius:"20px"}}/>
                                                            <button class="button btn-3"  style={{width:"70%", height:"4em", color:'red'}} onClick={() => setIsVisibleDemandeByReservation(true) + setIdService(call.Id_service)} > Voir les demandes <Badge color="red">{toggle === 1 ? getCountById(call.Id_service) : null}</Badge><div><FaCartPlus color='black' /></div></button>
                                                            <GrUpdate onClick={() => setIsVisibleDemandeUpdated(true)} className="update" style={{color:"maroon", width:"7%", height:"7%", borderRadius:"3px"}}/>
                                                            
                                                        </div>
                                                        }
                                                    </> :  
                                                <div class="flex-1" style={{textAlign:"end"}}><button class="button btn-3" style={{width:"90%", height:"100%"}} onClick={() => getById(call.Id_demande)} >Voir mes services </button></div>} </> : 
                                                <> <UpdateService infoDemande={infoDemande} update={call.Id_service} setIsVisibleDemandeUpdated={setIsVisibleDemandeUpdated}/> </>}
                                        </div>
                                    ))} </>
                                :
                                <> <DemandeByReservation IdService={IdService} demandeByReservation={demandeByReservation} setDemandeByReservation={setDemandeByReservation} setIsVisibleDemandeByReservation={setIsVisibleDemandeByReservation} /></>}
                            </> : <div className='not_found_demande' style={{display:"flex" ,justifyContent:"center", alignItems:"center", height:"100%", width:"100%"}}> Aucun service n'a été proposé de votre part </div>
                        } </> :
                        <div className='not_connected' style={{display:"flex" ,justifyContent:"center", alignItems:"center", height:"100%", width:"100%"}}>Connectez-vous pour de pouvoir consulter vos demandes</div>
                    }
                 </>
            </div> </>
        )

        function getById(id){
            infoDemande.resultat.forEach(element => {
            let Id_service = element.Id_service
                if(Id_service === id){
                    return 1
                }
                
            });
        }

        function getCountById(id){
            allDemandeByReservation.resultat.forEach(function(element, index){
                let Id_service = element.Id_service
                if(Id_service === id){
                    let count = allDemandeByReservation.resultat.length
                    return count
                } else {
                    return 0
                }
            });
        }
}

export default ListService