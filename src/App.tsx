import React from "react";
import axios from "axios";
import { BrowserRouter as Routes, Route, Link, Switch, BrowserRouter } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
import PatientInfo from "./patientPage/PatientInfo";
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
// import { patient } from "../data/patients";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/">
              <PatientListPage />
            </Route>
            <Route path="/patients/:id">
              <PatientInfo />
            </Route>
          </Switch>
        </Container>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
};

export default App;
