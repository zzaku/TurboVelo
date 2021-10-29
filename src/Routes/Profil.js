import './Styles/Profil.css'
import { useHistory } from 'react-router-dom'
import { useState } from 'react';
import './Styles/Profil.css'
import image from './Assets/vélo-profil.jpg'
import {
    Avatar,
    Button,
    Box,
    grommet,
    Grommet,
    Nav,
    Stack,
    Text,
    FileInput 
  } from 'grommet';
  import {
    Analytics,
    Chat,
    Clock,
    Configure,
    Help,
    Projects,
    Split,
    Secure,
    Logout
  } from 'grommet-icons';

  import { Sidebar } from 'grommet';
import { useEffect } from 'react/cjs/react.development';

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';


const SidebarButton = ({ icon, label, ...rest }) => (
  <Box pad="small">
    <Button
      gap="medium"
      alignSelf="start"
      plain
      icon={icon}
      label={label}
      {...rest}
    />
  </Box>
);

const MainNavigation = ({Confidentialite, setConfidentialite}) => (
  <Nav gap="large" responsive={false}>
    <SidebarButton icon={<Secure />} label="Confidentialité" onClick={() => setConfidentialite(Confidentialite === Confidentialite && !Confidentialite)} />
    <SidebarButton icon={<Projects />} label="Services" />
    <SidebarButton icon={<Clock />} label="Glances" />
    <SidebarButton icon={<Split />} label="Flows" />
    <SidebarButton icon={<Analytics />} label="Analytics" />
    <SidebarButton icon={<Configure />} label="Configure" />
  </Nav>
);


  


const Profil = ({connected, setConnected, setReparateur}) => {

    const [deconnect, setDeconnect] = useState({});
    const [Confidentialite, setConfidentialite] = useState(true)
    const [file, setFile] = useState()
    const [responseFile, setResponseFile] = useState()
    let history = useHistory();
    const Simple =
        <FileInput name="file_name"
          onChange={(event, { files }) => {
            const fileList = files;
            for (let i = 0; i < fileList.length; i += 1) {
                const file = fileList[i];
                setFile({name: 'avatar', file_name: file.name})
            }
          }}
        />
    
console.log(deconnect)
console.log(responseFile)


    useEffect(() => {
        if(file){
            fetch('http://localhost/Back-end/AddAvatar.php', {
                method: 'POST',
                body: JSON.stringify({
                    file, connected
                })
            }).then(res => res.json())
            .then(data => setResponseFile(data))
        }
    }, [file])

const SidebarFooter = 
    <Nav>
      <SidebarButton icon={<Chat />} label="Chat" />
      <SidebarButton icon={<Logout />} label="Se déconnecter" onClick={() => deconnexion()}/>
    </Nav>

const SidebarHeader =
<div className="container-avatar">
    <Box align="center" gap="small" direction="column" margin={{ bottom: 'large' }}>
        <div className="avatar">
            <Stack alignSelf="start" align="center" anchor="top-right">
                <Avatar background="accent-3" />
                <Box pad="xsmall" background="orange" round responsive={true} />
            </Stack>
            <div>
                <Text>
                    {connected.pseudo}
                </Text>
            </div>
        </div>
        <div>
            {Simple} Importez votre propre photo de profile ici !
        </div>
    </Box>
</div>

    function deconnexion(){
        fetch('http://localhost/Back-end/deconnexion.php', {
            method: 'POST',
            body: JSON.stringify({
                connected
            })
        }).then(res => res.json())
        .then(data => setDeconnect(data))
    }
    
    if(deconnect.deconnexion){
        setConnected({});
        setReparateur({newReparateur: false});
        history.push('/Connexion')
            
    }
    console.log(Confidentialite)

    return ( 
            <div className="container-profil">
                    <Grommet theme={grommet} full >
                        <div className="container-information">
                            <Box direction="row" height={{ min: '100%' }} flex={false}>
                            <Sidebar
                                responsive={false}
                                background="neutral-2"
                                header={SidebarHeader}
                                footer={SidebarFooter}
                                pad={{ left: 'medium', right: 'large', vertical: 'medium' }}
                                
                            >
                                <MainNavigation Confidentialite={Confidentialite} setConfidentialite={setConfidentialite}/>
                            </Sidebar>
                            </Box>
                            <div className="container-info"> {Confidentialite ?
                                <div className="form-info">
                                    <div>
                                        Nom <input value={connected.prenom}></input> Prénom : <input value={connected.nom}></input>
                                    </div> <br></br>

                                Mail <input value={connected.mail}></input> <br></br>
                                Téléphone <input value={connected.tel}></input> <br></br>
                                Adresse <input value={connected.adresse}></input> <br></br>
                                Connecté en tant que <input value={connected.status}></input> <br></br>
                                Déja réparateur <input value={connected.reparateur ? 'Oui' : 'Non'}></input> <br></br>
                                </div> : <img src={image} style={{width: "100%", height: "100%"}} /> }
                            </div>
                        </div>
                    </Grommet>
                    
                
            </div>
        );
    }
 
export default Profil;

