import React, { useEffect } from "react";

const PatientInfo: React.FC = () => {
  useEffect(() => {
    console.log("fffff");
    return;
  }, []);
  return <div><p>this is a patient info page</p></div>;
};

export default PatientInfo;
