import { useEffect, useState } from 'react'
import Inscription from '../Components/Inscription'
import Connexion from '../Components/Connexion'

function Identification({connected, setConnected}){

   const [register, setRegister] = useState(false)   

    return(
        <>
            {!register ? 
                <Connexion childConnected={connected} childSetConnected={setConnected} setRegister={setRegister}/>
            :
                <Inscription setRegister={setRegister}/>
            }
        </>
    )
}

export default Identification