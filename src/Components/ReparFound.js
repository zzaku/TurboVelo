import Repararer from "../Routes/Reparer"
import { useHistory } from "react-router"
import pneu from "./Assets/pneu.png"
import frein from "./Assets/frein.png"
import revision from "./Assets/revision.jpg"
import autre from "./Assets/autre.png"
import {UserWorker, LinkPrevious, Send}  from "grommet-icons"
import Demande from "./Demande"
import './Styles/Demande.css'
import "./Styles/ReparFound.css"
import { useEffect, useState } from "react"

function ReaparFound({dataRecherche, setNavClient}){

    const history = useHistory()
    const [idRep, setIdRep] = useState({})
    const [infoRep, setInfoRep] = useState({})
    const [previous, setPrevious] = useState(false)
    const [infoVisible, setInfoVisible] = useState(false)
    console.log("les datas que j'envoie : ", idRep)
    console.log("les datas que je reçois : ", infoRep)
    console.log('is visible ? ', infoVisible)

    function getInfoRep(){
        fetch('http://localhost/Back-end/InfoRep.php',{
            method: 'POST',
            body: JSON.stringify({
                idRep
            })
        })
        .then(res => res.json())
        .then(data => setInfoRep(data))
    }

    function makeDemande(){
        setPrevious(true)
        document.getElementsByClassName('list-item')[0].style.overflow = 'unset';
        document.getElementsByClassName('list-item')[0].style.width = '100%';
        
    }
    
    
        return(
            
            <div className="list-item" id="">{!previous ?
                <>
                   {dataRecherche.resultats.map((call) => (
                       <div id="tv" style={{listStyle:"none", textAlign:"center"}}>
                            {!infoVisible ? <> <div class="flex-1" style={{textAlign:"end"}}><button class="button btn-3" onClick={() => getById(call.Id_service) + getInfoRep()} style={{width:"100px"}}>Info <UserWorker /></button></div>
                            
                            <li>Catégorie : {call.Titre}</li><br></br>
                            <li><img src={call.Titre === 'freins' ? frein : 
                                call.Titre === 'autre' ? autre :
                                call.Titre === 'pneus' ? pneu :
                                call.Titre === 'revision' && revision} style={{width:'70%'}}/></li><br></br>
                            <li>Description : {call.Description}</li><br></br>
                            <li>Position : {call.Rayon_intervention}km</li><br></br>
                            <li>Prix : {call.Tarif}€</li> 
                            <div class="flex-1" style={{textAlign:"end"}}><button class="button btn-3" onClick={() =>getById(call.Id_service) + makeDemande()} style={{width:"90%", height:"4em"}}>Faire une demande <Send /></button></div></> 
                            : infoRep.id === call.Id_User && idRep.id_service === call.Id_service?<><div class="flex-1" style={{textAlign:"end"}}><button class="button btn-3" onClick={() => getById(call.Id_service)} style={{width:"100px"}}><LinkPrevious /></button></div>
                            <li><img src={call.Titre === 'freins' ? frein : 
                                call.Titre === 'autre' ? autre :
                                call.Titre === 'pneus' ? pneu :
                                call.Titre === 'revision' && revision} style={{width:'70%'}}/></li><br></br>
                            <li>Nom : {infoRep.prenom} {infoRep.nom}</li>
                            <li>Mail : {infoRep.mail}</li><br></br>
                            <li>Tel : {infoRep.tel}</li><br></br></>
                            :
                            <> <div class="flex-1" style={{textAlign:"end"}}><button class="button btn-3" onClick={() => getById(call.Id_service) + getInfoRep()} style={{width:"100px"}}>Info <UserWorker /></button></div>
                            
                            <li>Catégorie : {call.Titre}</li><br></br>
                            <li><img src={call.Titre === 'freins' ? frein : 
                                call.Titre === 'autre' ? autre :
                                call.Titre === 'pneus' ? pneu :
                                call.Titre === 'revision' && revision} style={{width:'70%'}}/></li><br></br>
                            <li>Description : {call.Description}</li><br></br>
                            <li>Position : {call.Rayon_intervention}km</li><br></br>
                            <li>Prix : {call.Tarif}€</li>
                            <div class="flex-1" style={{textAlign:"end"}}><button class="button btn-3" onClick={() => getById(call.Id_service) + makeDemande()} style={{width:"90%", height:"4em"}}>Faire une demande <Send /></button></div>
                            </> }
                       </div>
                   ))}
                 </>  : <div className="container-demande"><br></br><Demande setPrevious={setPrevious} childSetNavClient={setNavClient} idRep={idRep} /></div>}
            </div> 
        )

        function getById(id){
            dataRecherche.resultats.forEach(element => {
            let myIdService = element.Id_service 
                if(myIdService === id){
                    setIdRep({id_user: element.Id_User, id_service: element.Id_service})
                    setInfoVisible(infoVisible === infoVisible && !infoVisible);
                }
                
            });
        }
}

export default ReaparFound