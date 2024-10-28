import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { patientService } from '../../service/patientservice.service';
import { ToastrService } from 'ngx-toastr';  
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  patient = {
    registrationDate: this.getCurrentDate(),
    registrationTime: this.getCurrentTime(),
    patientFirstName: "",
    patientLastName: "",
    sex: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    phoneNumber: "",
    email: "",
    password: "",
    streetAddress: "",
    streetAddressLine2: "",
    city: "",
    stateOrProvince: "",
    postalOrZipCode: "",
    maritalStatus: "",
    emergencyContactFirstName: "",
    emergencyContactLastName: "",
    emergencyContactRelationship: "",
    emergencyContactPhoneNumber: "",
    familyDoctorFirstName: "",
    familyDoctorLastName: "",
    familyDoctorPhoneNumber: "",
    preferredPharmacy: "",
    pharmacyPhoneNumber: "",
    reasonForRegistration: "",
    additionalNotes: "",
    takingMedications: true,
    insuranceCompany: "",
    insuranceID: "",
    policyHolderFirstName: "",
    policyHolderLastName: "",
    policyHolderDateOfBirth: ""
  };

  constructor(private patientService: patientService, private router: Router) { }

  private getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; 
  }

  private getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().split(' ')[0].substring(0, 5);
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.patientService.register(this.patient).subscribe({
        next: response => {
          const healthCareNumber = response.healthCareNumber;
          this.router.navigate(['/']);
        },
        error: err => {
          console.log('Registration failed', 'Error')
          // this.toastr.error('Registration failed', 'Error');
        }
      });
    } else {
      console.log('Form is invalid');
      // this.toastr.warning('Form is invalid', 'Warning');
    }
  }
  

  private isFormValid(): boolean {
    
    return this.patient.patientFirstName !== "" && this.patient.patientLastName !== "" && this.patient.email !== "";
  }
}
