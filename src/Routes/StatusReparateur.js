import {Grommet, Box, Grid} from 'grommet'
import { grommet } from 'grommet/themes';
import image from './Assets/velo-home.jpg'
import { ControlledInput } from '../Components/FormRecherche';
import { useState, useContext } from 'react';
import NavHomeReparateur from '../Components/NavHomeReparateur';
import HomeClient from "../Components/HomeClient"
import ReparFound from '../Components/ReparFound';
import ListDemande from '../Components/ListDemande';
import './Styles/StatusClient.css'

function StatusReparateur({connected}){
    
    const [recherche, setRecherche] = useState({});
    const [dataRecherche, setDataRecherche] = useState([]);
    const [realTarif, setRealTarif] = useState({min: 10, max: 15})
    const [navClient, setNavClient] = useState("DEFAULT");
    
    console.log(navClient)
    

    return(
            <Grommet full theme={"dark"} style={{overflow: "unset"}}>
                <Grid rows={['xsmall', 'large']} columns={['80%']} gap="xsmall"
                    areas={[
                        ['nav', 'nav'],
                        ['main', 'main'],
                        ['footer', 'footer']
                    ]}
                >
                    <Box gridArea="nav" background="light-5"> <NavHomeReparateur childConnected={connected} setNavClient={setNavClient} /> </Box>

                    <div className="main-body">
                        
                            <div className="body-home-container">
                                {navClient === "REPARATION" ? 
                                <ControlledInput recherche={recherche} setRecherche={setRecherche} dataRecherche={dataRecherche} setDataRecherche={setDataRecherche} realTarif={realTarif} setRealTarif={setRealTarif} setNavClient={setNavClient} />
                                :
                                navClient === "HOME" ?
                                <HomeClient />
                                : 
                                navClient ==="FOUND" ?
                                <ReparFound dataRecherche={dataRecherche} setNavClient={setNavClient} />
                                :
                                navClient ==="GETDEMANDE" ?
                                <ListDemande childConnected={connected} />
                                :
                                null
                                }
                            </div>
                      
                    </div>
                    <div className="content-body">
                        <Box gridArea="main" background="light-0" >
                            <div className="body-home-content">
                                <img src={image} style={{height:'100%', width: '100%'}}/>
                            </div>
                        </Box>
                    </div>
                    <Box gridArea="footer" background="brand"> Footer </Box>
                </Grid>
            </Grommet>
        
    )
}

export default StatusReparateur