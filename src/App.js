import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import StatusClient from "./Routes/StatusClient";
import Identification from "./Routes/Identification";
import Profil from "./Routes/Profil";
import Navbar from "./Routes/Navbar";
import Reservation from "./Routes/Reservation";
import Reparation from "./Routes/Reparation";
import Repararer from "./Routes/Reparer";
import { Footer, Text, Anchor } from "grommet";
import { connectedContext, demandeContext } from "./Components/MyContexts";
import "./App.css";
import { useContext, useEffect } from "react/cjs/react.development";

function App() {
  const saveConnexion = localStorage.connected;

  const [connected, setConnected] = useState(
    saveConnexion ? JSON.parse(saveConnexion) : []
  );

  useEffect(() => {
    localStorage.setItem("connected", JSON.stringify(connected));
  }, [connected]);

  const saveReparateur = localStorage.reparateur;

  const [reparateur, setReparateur] = useState(
    saveReparateur ? JSON.parse(saveReparateur) : []
  );

  useEffect(() => {
    localStorage.setItem("reparateur", JSON.stringify(reparateur));
  }, [reparateur]);

  return (
    <connectedContext.Provider value={connected.id}>
      <Router>
        <Navbar
          connected={connected}
          reparateur={reparateur}
          setReparateur={setReparateur}
        />
        <Switch>
          <Route
            path="/Home"
            exact
            component={() => <StatusClient connected={connected} />}
          ></Route>
          <Route
            path="/Profil"
            exact
            component={() => (
              <Profil
                connected={connected}
                setConnected={setConnected}
                setReparateur={setReparateur}
              />
            )}
          ></Route>
          <Route
            path="/Reservation"
            exact
            component={() => <Reservation connected={connected} />}
          ></Route>
          <Route
            path="/Reparation"
            exact
            component={() => (
              <Reparation
                connected={connected}
                setConnected={setConnected}
                reparateur={reparateur}
                setReparateur={setReparateur}
              />
            )}
          ></Route>
          <Route
            path="/Reparer"
            exact
            component={() => (
              <Repararer connected={connected} setConnected={setConnected} />
            )}
          ></Route>
          <Route
            path="/Connexion"
            exact
            component={() => (
              <Identification
                connected={connected}
                setConnected={setConnected}
              />
            )}
          ></Route>
        </Switch>
      </Router>
    </connectedContext.Provider>
  );
}

export default App;
