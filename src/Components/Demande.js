import React, { useContext, useState } from 'react';
import './Styles/Demande.css'
import "./Styles/ReparFound.css"
import { connectedContext } from './MyContexts';

import {
  Calendar,
  Box,
  Button,
  CheckBox,
  ContainerTargetContext,
  Form,
  FormField,
  Grommet,
  MaskedInput,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
  TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { ThemeConsumer, ThemeContext } from 'styled-components';
import { useHistory } from 'react-router';

export const Demande = ({setPrevious, idRep, childSetNavClient}) => {
    
  const current_id = useContext(connectedContext);
  const history = useHistory();
  const [sujet, setSujet] = useState('');
  const [crenau, setCrenau] = useState('');
  const [adresse, setAdresse] = useState('');
  const [checked, setChecked] = useState(false);
  const [demande, setDemande] = useState({});
  const [responseDemande, setResponseDemande] = useState({});
  const [next, setNext] = useState(1)
  console.log('ma demande : ', demande)
  console.log('ma réponse : ', responseDemande)
  
  
  
  function SendDemande(){
    fetch('http://localhost/Back-end/PostDemande.php', {
      method: 'POST',
      body: JSON.stringify({
        demande
      })
    }).then(res => res.json())
    .then(data => setResponseDemande(data))
  }

  
  function changeClass(){
    if(next === 1 && demande.sujet !== null){
      document.getElementsByClassName('bar')[0].classList.add('bar-anim')
    } else if (next === 2){
      document.getElementsByClassName('bar2')[0].classList.add('bar-anim2')
    } else if (next === 3){
      document.getElementsByClassName('bar3')[0].classList.add('bar-anim3')
    } 
  }

  
  function changeClassAnim(){
    if(next === 1){
      document.getElementsByClassName('bar-anim')[0].classList.remove('bar-anim')
    } else if (next === 2){
      document.getElementsByClassName('bar-anim2')[0].classList.remove('bar-anim2')
    } else if (next === 3){
      document.getElementsByClassName('bar-anim3')[0].classList.remove('bar-anim3')
    } 
  }

  
  
  return (<div className="bloc-demande">
            <div className="anim-bar">
                <p className="step1"></p>
                <p className="step2"></p>
                <p className="bar"></p>
                <p className="bar2"></p>
                <p className="bar3"></p>
            </div>
        
            <div className="form-recherche">
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
          onChange={event => setDemande({sujet, crenau, adresse, id: current_id, id_rep: idRep.id_user, id_service: idRep.id_service})}
            onReset={() => {
              setSujet('');
              setCrenau('');
              setAdresse('');
            }}
          >
              {next === 1 && <>
            <FormField label="Crenau" name="crenau">
              <Calendar
                size="small"
                date={(new Date()).toDateString()}
                onSelect={date => setCrenau(date)}
              />
              <CheckBox
                checked={checked}
                label="Valider cette date"
                onChange={(event) => setChecked(event.target.checked) + changeClass('bar3')}
              />
              <Box direction="row" justify="between" margin={{ top: 'medium' }} style={{justifyContent:"space-between"}}>
                <Button disabled={!checked ? true : false} onClick={() => setNext(2) + changeClass('bar')} type='submit' label="Suivant" primary />
              </Box>
            </FormField>
                  </>
                }
              {next === 2 && <>
            <FormField label="Adresse" name="adresse">
              <TextInput
                name="adresse"
                value={adresse}
                onChange={event => setAdresse(event.target.value)}
              />
              <Box direction="row" justify="between" margin={{ top: 'medium' }}>
                <Button onClick={() => setNext(3) + changeClass('bar2')} type='submit' label="Suivant" primary />
                <Button onClick={() => setNext(1) + changeClassAnim('bar-anim2')} type='submit' label="Précédent" primary />
              </Box>
            </FormField>
          </>
        }
              {next === 3 && <> {!responseDemande.successDemande ? <>
                      <div className="form-select">
                        <p className="label-sujet">sujet</p><br/>
                        <TextArea
                            name="Sujet"
                            value={sujet}
                            onChange={event => setSujet(event.target.value)}
                        />
                        <div className="send-demande">
                          <Button style={{width:"50%"}} onClick={() => setNext(2) + changeClassAnim('bar-anim3')} type='submit' label="Précédent" primary />
                          <Button style={{width:"50%"}} type='submit' label="Envoyer ma demande" primary onClick={() => SendDemande()} />
                        </div>
                    </div>
                  <br/>
                  </> : <> <div className="form-select">
                        <p className="label-sujet">Demande envoyé !</p><br/>
                        <div className="send-demande">
                          <Button style={{width:"100%"}} type='submit' label="Consulter mes demandes" primary onClick={() => childSetNavClient('GETDEMANDE')} />
                          
                        </div>
                    </div> </>}
            </>}
          </Form>
        </Box>
      </Box>
    </div>
    <br></br>
    <div className="bloc-button"><button className="button btn-3" onClick={() => setPrevious(false)}>Retour</button></div>
    </div>
  );
};

Demande.storyName = 'Controlled input';

Demande.parameters = {
  // chromatic disabled because snapshot is the same as ControlledInputLazy
  chromatic: { disable: true },
};

export default Demande