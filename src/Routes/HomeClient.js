import {Grommet, Box, Grid} from 'grommet'
import { grommet } from 'grommet/themes';
import image from './Assets/velo-home.jpg'
import { ControlledInput } from '../Components/FormRecherche';
import { useState } from 'react';
import './Styles/HomeClient.css'

function HomeClient({connected}){

    const [recherche, setRecherche] = useState({});
    const [dataRecherche, setDataRecherche] = useState({});
    const [realTarif, setRealTarif] = useState({min: 10, max: 15})
    console.log("le vari tarif : ", realTarif)
    console.log('trouvé : ', dataRecherche)

    return(
            <Grommet full theme={grommet}>
                <Grid rows={['xsmall', 'large']} columns={['60%', '40%']} gap="xsmall"
                    areas={[
                        ['nav', 'nav'],
                        ['main', 'main'],
                        ['footer', 'footer']
                    ]}
                >
                    <Box gridArea="nav" background="light-5"> Nav </Box>

                    <div className="main-body">
                        <Box gridArea="main" background="light-0" >
                            <div className="body-home-search">
                                <ControlledInput recherche={recherche} setRecherche={setRecherche} setDataRecherche={setDataRecherche} realTarif={realTarif} setRealTarif={setRealTarif} />
                            </div>
                        </Box>
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

export default HomeClient