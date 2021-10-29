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

export const UpdateDemande = ({infoDemande, update, childSetNavClient, setIsVisibleDemandeUpdated}) => {
    
  const current_id = useContext(connectedContext);
  const [sujet, setSujet] = useState('');
  const [crenau, setCrenau] = useState('');
  const [adresse, setAdresse] = useState('');
  const [checked, setChecked] = useState(false);
  const [demande, setDemande] = useState({});
  const [demandeUpdated, setDemandeUpdated] = useState({})

  console.log('ma demande : ', demande)
  console.log('ma réponse : ', demandeUpdated)



  function UpdateDemande(id){
    infoDemande.resultat.forEach(element => {
        let myIdDemande = element.Id_demande
            if(myIdDemande === id){
                fetch('http://localhost/Back-end/UpdateDemande.php',{
                    method: 'POST',
                    body: JSON.stringify({
                        myIdDemande, demande
                    })
                }).then(res => res.json())
                .then(data => setDemandeUpdated(data))
            }
        });
}
  
  return (
        <div className="bloc-demande">
            
            <div className="form-recherche">
                <Box fill align="center" justify="center">
                    <Box width="medium">
                    <Form
                    onChange={event => setDemande({sujet, crenau, adresse})}
                        onReset={() => {
                        setSujet('');
                        setCrenau('');
                        setAdresse('');
                        }}
                    >
                    
                    <FormField label="Crenau" name="crenau">
                    <Calendar
                        size="small"
                        date={(new Date()).toDateString()}
                        onSelect={date => setCrenau(date)}
                    />
                    <CheckBox
                        checked={checked}
                        label="Valider cette date"
                        onChange={(event) => setChecked(event.target.checked)}
                    />
                    </FormField>
                        
                        
                    
                    <FormField label="Adresse" name="adresse">
                    <TextInput
                        name="adresse"
                        value={adresse}
                        onChange={event => setAdresse(event.target.value)}
                    />
                    </FormField>
                      <div className="form-select">
                        <p className="label-sujet">sujet</p><br/>
                        <TextArea
                            name="Sujet"
                            value={sujet}
                            onChange={event => setSujet(event.target.value)}
                        />
                        <div className="send-demande">
                          <Button style={{width:"50%"}} type='submit' label="Modifier ma demande" primary onClick={() => UpdateDemande(update)} />
                        </div>
                    </div>
                  <br/>
                  {demandeUpdated.successDemande && <> <div className="form-select">
                        <p className="label-sujet">Demande modifié !</p><br/>
                        <div className="send-demande">
                          <Button style={{width:"100%"}} type='submit' label="Consulter mes demandes" primary onClick={() => childSetNavClient('GETDEMANDE')} />
                        </div>
                    </div> </>}
          </Form>
        </Box>
      </Box>
    </div>
    <br></br>
    <div className="bloc-button"><button className="button btn-3" onClick={() => setIsVisibleDemandeUpdated(false)}>Retour</button></div>
    </div>
  );
};

UpdateDemande.storyName = 'Controlled input';

UpdateDemande.parameters = {
  // chromatic disabled because snapshot is the same as ControlledInputLazy
  chromatic: { disable: true },
};

export default UpdateDemande