import {useState} from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Container, Table, Button } from "semantic-ui-react";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient ,PublicPatientInfo} from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, addPatient } from "../state";

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();
   const [patientsList,setPatientsList]= useState<PublicPatientInfo[]>([]);
  // const [patientsList,setPatientsList]= useState<string>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

 
  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      console.log("before axios post");
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      
      dispatch(addPatient(newPatient));
      closeModal();
    } catch (error:any) {
      console.error(error.response?.data || 'Unknown Error');
      setError(error.response?.data?.error || 'Unknown error');
      console.log(error);
    }
  };
  const displaySecurePatients= async ()=>{
    try {
      console.log("before axios display secure");
    const securePatients = (await axios.get<PublicPatientInfo[]>
      (`${apiBaseUrl}/patients`)).data;
    Object.entries(securePatients);
    console.log(securePatients);
    console.log(typeof securePatients);
     setPatientsList([]);
    return ;
    } catch (error) {
      console.log(error);
      return;
    }
    
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values((patients)).map((patient: Patient ) => (
            <Table.Row key={patient.id}>
              {/* <Table.Cell>{patient.name}</Table.Cell> */}
              <Table.Cell>
                {/* <Link to={`/patients/${patient.id}`} target={"_blank"}>{patient.name}</Link> */}
                <a href={`/patients/${patient.id}`}>{patient.name}</a>
              </Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
      <Button onClick={()=>{
        void displaySecurePatients();
      }}>Get Patients List</Button>
      <div id="patientsListArea">{patientsList.map((p,i)=>{
        return <p key={i}>{p}</p>;
      })}</div>
    </div>
  );
};

export default PatientListPage;
