import React, { useState } from 'react';
import { Grommet, Notification, Box, Button } from 'grommet';
import { grommet } from 'grommet/themes';
import './Styles/Connexion.css'


const TitleAndMessageNotificationApprouved = () => {
  const [visible, setVisible] = useState(false);

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(undefined);

  return (
    <Grommet theme={"brand"}>
      <Box pad="small" justify="center" >
        <Button color={"green"} label="SUCCESS" onClick={onOpen} />
      </Box>
      {visible && (
        <Notification
          status='normal'
          title="REGISTERED"
          message="Votre inscription est confirmé."
          onClose={onClose}
        />
      )}
    </Grommet>
  );
};

export const ToastApprouved = () => <TitleAndMessageNotificationApprouved />;

ToastApprouved.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/Notification/Toast',
};