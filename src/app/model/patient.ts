export class Patient {
    healthCareNumber?: string; 
    registrationDate?: string; 
    registrationTime?: string;
    patientFirstName?: string;
    patientLastName?: string; 
    sex?: string; 
    birthMonth?: string;
    birthDay?: string;
    birthYear?: string; 
    phoneNumber?: string;
    email?: string; 
    password?: string; 
    streetAddress?: string; 
    streetAddressLine2?: string; 
    city?: string; 
    stateOrProvince?: string; 
    postalOrZipCode?: string; 
    maritalStatus?: string; 
    emergencyContactFirstName?: string; 
    emergencyContactLastName?: string; 
    emergencyContactRelationship?: string; 
    emergencyContactPhoneNumber?: string; 
  
    constructor(init?: Partial<Patient>) {
      Object.assign(this, init);
    }
  }
  