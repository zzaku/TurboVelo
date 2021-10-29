import { ControlledInput } from "../Components/FormService"
import React, { useState } from 'react';
import { Box, Grommet, Grid } from "grommet";
import { grommet, hexValue} from 'grommet/themes';
import image from './Assets/velo-home.jpg'
import NavHomeReparateur from "../Components/NavHomeReparateur";
import ListService from "../Components/ListService";
import './Styles/Reparer.css'

function Repararer({connected}){

    const [service, setService] = useState({});
    const [dataService, setDataService] = useState({});
    const [navReparateur, setNavReparateur] = useState("DEFAULT");
    console.log('response : ', dataService);

    return(
        <Grommet full theme={"dark"} style={{overflow:"unset"}} background={{
            image: image,
          }}>
                <Grid rows={['xsmall', 'large']} columns={['80%']} gap="xsmall"
                    areas={[
                        ['nav', 'nav'],
                        ['main', 'main'],
                        ['footer', 'footer']
                    ]}
                >
                    <Box gridArea="nav" background="light-5"><NavHomeReparateur setNavReparateur={setNavReparateur}/></Box>

                    <div className="main-body">
                        <div className="body-home-container">
                        {navReparateur === "HOME" ? 
                                null
                                :
                                navReparateur === "AddDService" ?
                                <>
                                    <br></br><ControlledInput childConnected={connected} service={service} setService={setService} dataService={dataService} setDataService={setDataService} setNavReparateur={setNavReparateur}/>
                                </>
                                : 
                                navReparateur ==="Services" ?
                                    <ListService childConnected={connected}/>
                                :
                                navReparateur ==="GETDEMANDE" ?
                                null
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
                        
                    
                    <Box gridArea="footer" width="100%" height="150px" background="brand"> Footer </Box>
                </Grid>
            </Grommet>
            
            
                
        
    )
}

export default Repararer