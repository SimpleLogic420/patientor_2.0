import express from 'express';
import cors from "cors";
import diagnosis from "../data/diagnosis"
import {securePatients,patient} from "../data/patients"
// import {PublicPatientInfo} from "../src/types"
import toNewPatientEntry from './utils';
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.get("/diagnosis",(_req,res)=>{
  res.send(diagnosis)
})
app.get("/api/patients",(_req,res)=>{
  console.log("sixone")
  
  res.send(securePatients);
})
app.post("/api/patients",(req,res)=>{
const newPatient =  toNewPatientEntry(req.body);
securePatients.push(newPatient)
res.send(securePatients);
})
app.get("/api/patients/:id",(req,res)=>{
  for (let i =0 ; i<patient.length;i++){
    patient[i].entries=[];
  };
const patientId = req.params.id
const patientInfo=patient.filter((p)=> p.id === patientId)
res.send(patientInfo);

})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});