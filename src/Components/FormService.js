import React, { useState } from "react";
import "./Styles/FormService.css";
import { ToastApprouved } from "../Components/TitleAndMessageNotificationApprouved";
import { Toast } from "../Components/TitleAndMessageNotification ";

import {
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
} from "grommet";
import { grommet } from "grommet/themes";

export const ControlledInput = ({
  childConnected,
  service,
  setService,
  dataService,
  setDataService,
  setNavReparateur,
}) => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [tarif, setTarif] = useState("");
  const [zone, setZone] = useState("");
  console.log(service);
  return (
    <div className="form-recherche">
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            onChange={(event) =>
              setService({ titre, description, tarif, zone })
            }
            onReset={() => {
              setTitre("");
              setDescription("");
              setTarif("");
              setZone("");
            }}
            onSubmit={(event) =>
              setService(event.value) +
              fetch("http://localhost/Back-end/AddService.php", {
                method: "POST",
                body: JSON.stringify({
                  childConnected,
                  service,
                }),
              })
                .then((res) => res.json())
                .then((data) => setDataService(data)) +
              dataService.successAjout ? (
                (
                  <>
                    <ToastApprouved />
                  </>
                ) +
                setTimeout(function () {
                  setNavReparateur("Services");
                }, 1500)
              ) : (
                <Toast />
              )
            }
          >
            <div className="form-select">
              <p className="label-titre">Titre</p>
              <br />
              <Select
                options={["freins", "pneus", "revision", "autre"]}
                value={titre}
                onChange={({ option }) => setTitre(option)}
              />
            </div>
            <br />
            <FormField label="Description" name="description">
              <TextArea
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </FormField>
            <FormField label="Tarif en €" name="tarif">
              <TextInput
                name="tarif"
                value={tarif}
                onChange={(event) => setTarif(event.target.value)}
              />
            </FormField>
            <FormField label="Zone" name="zone" pad>
              <RangeInput
                name="zone"
                min={5}
                max={100}
                value={zone}
                onChange={(event) => setZone(event.target.value)}
              />
              {service.zone} km
            </FormField>
            <Box direction="row" justify="between" margin={{ top: "medium" }}>
              <Button label="Annuler" />
              <Button type="reset" label="Effacer" />
              <Button type="submit" label="Ajouter" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </div>
  );
};

ControlledInput.storyName = "Controlled input";

ControlledInput.parameters = {
  // chromatic disabled because snapshot is the same as ControlledInputLazy
  chromatic: { disable: true },
};

export default {
  title: "Input/Form/Controlled input",
};
