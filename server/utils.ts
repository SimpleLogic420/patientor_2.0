import {PublicPatientInfo,Gender} from "../src/types"
// import { Entry } from "../src/types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const parseId = (id: unknown): string => {
    if (!id || !isString(id)) {
      throw new Error('Incorrect or missing id');
    }
  
    return id;
  };

  const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
  };

  const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
      throw new Error('Incorrect or missing name');
    }
  
    return dateOfBirth;
  };

  const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender)) {
      throw new Error('Incorrect or missing name');
    }else if(gender==="male"){
        return Gender.Male
    }else if(gender==="female"){
        return Gender.Female;
    }
    throw new Error('Male or Female only !');
    
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing name');
    }
  
    return occupation;
  };

  // const parseEntries = (entries: any): Entry[] => {
  //   if (!entries || !Array.isArray(entries)) {
  //     throw new Error(`Incorrect or missing entries: ${entries}`);
  //   }
  //   return entries;
  // };

type Fields = { 
    id : unknown,
    name: unknown,
    dateOfBirth?: unknown,
    gender: unknown ,
    occupation:unknown,
    entries?:unknown
};

const toNewPatientEntry = ({id,name,dateOfBirth,gender,occupation} : Fields): PublicPatientInfo => {

  const newEntry: PublicPatientInfo = {
 id:parseId(id),
 name:parseName(name),
 dateOfBirth:parseDateOfBirth(dateOfBirth),
 gender:parseGender(gender),
 occupation:parseOccupation(occupation),
 
  };

  return newEntry;
};



export default toNewPatientEntry;