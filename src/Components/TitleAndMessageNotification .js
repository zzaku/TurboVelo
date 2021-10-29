import React, { useState } from 'react';
import { Grommet, Notification, Box, Button } from 'grommet';
import { grommet } from 'grommet/themes';
import './Styles/Connexion.css'


const TitleAndMessageNotification = () => {
  const [visible, setVisible] = useState(false);

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(undefined);

  return (
    <Grommet theme={"brand"}>
      <Box pad="small" justify="center" >
        <Button color={"red"} label="INVALID" onClick={onOpen} />
      </Box>
      {visible && (
        <Notification
          status='critical'
          title="Pseudo already existing"
          message="Veuillez choisir un autre pseudo, celui-ci existe déjà."
          onClose={onClose}
        />
      )}
    </Grommet>
  );
};

export const Toast = () => <TitleAndMessageNotification />;

Toast.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/Notification/Toast',
};