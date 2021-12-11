/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from "react";
// import { Icon } from "semantic-ui-react";
// import { Icon } from "semantic-ui-react";
// import { useParams } from "react-router-dom";
 import { patient } from "../data/patients";

const PatientInfo: React.FC = () => {
  // const genderIcons = {
  //   male: "mars" as const,
  //   female: "venus" as const,
  //   other: "genderless" as const,
  // };
  useEffect(() => {
    const currentUrl:string[]=(window.location.href).split("/");
    const currentPatientId:string=currentUrl[4];
    console.log(currentPatientId);
    
    return;
  }, []);
  const getPatientId=()=>{
    const currentUrl:string[]=(window.location.href).split("/");
    const currentPatientId:string=currentUrl[4];
    for(let i =0;i<patient.length;i++){
      // eslint-disable-next-line no-cond-assign
      if(patient[i].id===currentPatientId){
        //  const currentGender=patient[i].gender ;
        return <div>
          
          <h1>{patient[i].name} {/*<Icon name={genderIcons[patient[i].gender]}/>*/}</h1>
          <h4>ssn : {patient[i].ssn}</h4>
          <h4>occupation : {patient[i].occupation}</h4>
        </div>;
        
      }
    }
    console.log(currentPatientId);
    return currentPatientId;
  };
  return <div>{getPatientId()}</div>;
};

export default PatientInfo;
