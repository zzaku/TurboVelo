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

export const UpdateService = ({infoDemande, update, childSetNavClient, setIsVisibleDemandeUpdated}) => {
    
  const current_id = useContext(connectedContext);
  const [tarif, setTarif] = useState('');
  const [titre, setTitre] = useState('');
  const [zone, setZone] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState(false);
  const [service, setService] = useState({});
  const [demandeUpdated, SetDemandeUpdated] = useState({})

  console.log('ma service : ', service)
  console.log('ma réponse : ', demandeUpdated)



  function UpdateService(id){
    infoDemande.resultat.forEach(element => {
        let myIdDemande = element.Id_service
            if(myIdDemande === id){
                fetch('http://localhost/Back-end/UpdateService.php',{
                    method: 'POST',
                    body: JSON.stringify({
                        myIdDemande, service
                    })
                }).then(res => res.json())
                .then(data => SetDemandeUpdated(data))
            }
        });
}
  
  return (
        <div className="bloc-service">
            
            <div className="form-recherche">
                <Box fill align="center" justify="center">
                    <Box width="medium">
                    <Form
                    onChange={event => setService({tarif, titre, zone, description})}
                        onReset={() => {
                            setTarif('');
                            setTitre('');
                            setZone('');
                            setDescription('');
                        }}
                    >
                    
                    <FormField label="Catégorie" name="Catégorie">
                    <Select
                            options={['freins', 'pneus', 'revision', 'autre']}
                            value={titre}
                            onChange={({ option }) => setTitre(option)}
                        />
                    </FormField>
                    
                    <FormField label="description" name="description">
                        <TextArea
                            name="description"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                    </FormField>
                    <FormField label="Tarif en €" name="tarif">
                        <TextInput
                            name="tarif"
                            value={tarif}
                            onChange={event => setTarif(event.target.value)}
                        />
                    </FormField>
                    <FormField label="Zone" name="zone" pad>
                        <RangeInput
                            name="zone"
                            min={5}
                            max={100}
                            value={zone}
                            onChange={event => setZone(event.target.value)}
                        />
                        {service.zone} km
                    </FormField>
                        <div className="send-service">
                          <Button style={{width:"50%"}} type='submit' label="Modifier ma service" primary onClick={() => UpdateService(update)} />
                        </div>
                  <br/>
                  {demandeUpdated.successService && <> <div className="form-select">
                        <p className="label-sujet">Service modifié !</p><br/>
                        <div className="send-service">
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

UpdateService.storyName = 'Controlled input';

UpdateService.parameters = {
  // chromatic disabled because snapshot is the same as ControlledInputLazy
  chromatic: { disable: true },
};

export default UpdateService