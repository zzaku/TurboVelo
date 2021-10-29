import React, { useState } from 'react';
import './Styles/FormRecherche.css'

import {
    Stack,
    Text,
    RangeSelector,
    Heading,
    Box,
    Button,
    CheckBox,
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

export const ControlledInput = ({recherche, setRecherche, dataRecherche, setDataRecherche, realTarif, setRealTarif, setNavClient}) => {
    const [checkedLocalisation, setCheckedLocalisation] = useState(false);
    const [titre, setTitre] = useState('pneus');
    const [tarif, setTarif] = React.useState([1, 3]);
    const [zone, setZone] = useState('');
    console.log('recherche : ', recherche)
    console.log(zone)
    function getTarif(values){
        setTarif(values)
       const index1 = tarif[0] === 1 ?
            setRealTarif({min: 10, max: realTarif.max}) : tarif[0] === 2 ?
            setRealTarif({min: 15, max: realTarif.max}) : tarif[0] === 3 ?
            setRealTarif({min: 25, max: realTarif.max}) : tarif[0] === 4 ?
            setRealTarif({min: 30, max: realTarif.max}) : tarif[0] === 5 ?
            setRealTarif({min: 35, max: realTarif.max}) : tarif[0] === 6 ?
            setRealTarif({min: 40, max: realTarif.max}) : tarif[0] === 7 ?
            setRealTarif({min: 45, max: realTarif.max}) : tarif[0] === 8 ?
            setRealTarif({min: 50, max: realTarif.max}) : tarif[0] === 9 ?
            setRealTarif({min: 55, max: realTarif.max}) : tarif[0] === 10 ?
            setRealTarif({min: 60, max: realTarif.max}) : tarif[0] === 11 ?
            setRealTarif({min: 65, max: realTarif.max}) : tarif[0] === 12 ?
            setRealTarif({min: 70, max: realTarif.max}) : null
        
            const index2 = tarif[1] === 1 ?
            setRealTarif({min: realTarif.min, max: 10}) : tarif[1] === 2 ?
            setRealTarif({min: realTarif.min, max: 15}) : tarif[1] === 3 ?
            setRealTarif({min: realTarif.min, max: 25}) : tarif[1] === 4 ?
            setRealTarif({min: realTarif.min, max: 30}) : tarif[1] === 5 ?
            setRealTarif({min: realTarif.min, max: 35}) : tarif[1] === 6 ?
            setRealTarif({min: realTarif.min, max: 40}) : tarif[1] === 7 ?
            setRealTarif({min: realTarif.min, max: 45}) : tarif[1] === 8 ?
            setRealTarif({min: realTarif.min, max: 50}) : tarif[1] === 9 ?
            setRealTarif({min: realTarif.min, max: 55}) : tarif[1] === 10 ?
            setRealTarif({min: realTarif.min, max: 60}) : tarif[1] === 11 ?
            setRealTarif({min: realTarif.min, max: 65}) : tarif[1] === 12 ?
            setRealTarif({min: realTarif.min, max: 70}) : null
    }
    function confirmSearch(){
        if(dataRecherche.found){
           return setNavClient("FOUND")
        }
    }

  return(
    <div className="form-recherche">
        <Box pad="large" fill align="center" justify="center" height="xsmall" width="medium">
            <Form
                onChange={() => setRecherche({realTarif, titre, zone})}
                onReset={() => {
                setTitre('');
                setTarif('');
                setZone('');
                }}
                onSubmit={event =>
                    fetch('http://localhost/Back-end/SearcheService.php', {
                        method: 'POST',
                        body: JSON.stringify({
                            recherche
                        })
                    }).then(res => res.json())
                    .then(data => setDataRecherche(data)) +
                    confirmSearch()
                }
            >
                <Heading level={2} size="xsmall">
            Trouver une réparation
          </Heading>
                    <div className="form-select">
                        <p className="label-titre">Titre</p><br/>
                        <Select
                            options={['freins', 'pneus', 'revision', 'autre']}
                            value={titre}
                            onChange={({ option }) => setTitre(option)}
                        />
                    </div>
                    <br/>
                <FormField label="Prix" name="tarif">
                    <Stack>
                        <Box direction="row" justify="between">
                                {[10, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70].map(value => (
                            <Box key={value} pad="small" border={false}>
                                <Text style={{ fontFamily: 'monospace' }}>
                                    {value}€
                                </Text>
                            </Box>
                                ))}
                        </Box>
                        <RangeSelector
                            direction="horizontal"
                            invert={false}
                            min={1}
                            max={12}
                            size="full"
                            round="small"
                            values={tarif}
                            onChange={getTarif}
                        />
                    </Stack>
                </FormField>
                                <br/>
                    <div className="localisation">
                        {!checkedLocalisation ?
                        <>
                            <TextInput
                                placeholder="Entrez le nom de votre ville"
                                value={zone}
                                onChange={event => setZone(event.target.value)}
                            />
                            <CheckBox
                                checked={checkedLocalisation}
                                label="utilisez votre position actuelle ?"
                                onChange={(event) => setCheckedLocalisation(event.target.checked)}
                            /> 
                        </> :
                    <FormField label="Zone" name="zone" pad>
                        <RangeInput
                            name="zone"
                            min={5}
                            max={100}
                            value={zone}
                            onChange={event => setZone(event.target.value)}
                        /> {recherche.zone} km
                        <CheckBox
                                checked={checkedLocalisation}
                                label="utilisez votre position actuelle ?"
                                onChange={(event) => setCheckedLocalisation(event.target.checked)}
                            /> 
                        </FormField>}
                    </div>

                <Box direction="row" justify="between" margin={{ top: 'medium' }}>
                <Button type="reset" label="Effacer" />
                <Button type='submit' label="Rechercher" primary />
                </Box>
            </Form>
        </Box>
    </div>
  );
};

ControlledInput.storyName = 'Controlled input';

ControlledInput.parameters = {
  // chromatic disabled because snapshot is the same as ControlledInputLazy
  chromatic: { disable: true },
};

export default {
  title: 'Input/Form/Controlled input',
};