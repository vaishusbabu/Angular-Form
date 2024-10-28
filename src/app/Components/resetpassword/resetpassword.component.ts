import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { patientService } from '../../service/patientservice.service'; // Ensure the service name starts with a capital letter

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [RouterLink, RouterOutlet, LoginComponent, CommonModule, FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  resetPasswordData = {
    healthCareNumber: '',
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private patientService: patientService) {} // Make sure PatientService is capitalized

  onSubmit(form: any) {
    
    if (this.resetPasswordData.newPassword !== this.resetPasswordData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.successMessage = '';
      return;
    }

    if (form.valid) {
      const { healthCareNumber, email, otp, newPassword, confirmPassword } = this.resetPasswordData;

      // Call the resetPassword method from the patient service
      this.patientService.resetPassword(healthCareNumber, email, otp, newPassword, confirmPassword) // Add confirmPassword here
        .subscribe({
          next: (response) => {
            console.log("Password reset successfully")
            this.successMessage = 'Password reset successfully.';
            this.errorMessage = '';  
            form.reset(); 
          },
          error: (error) => {
            console.log("Failed to reset password.")
            this.errorMessage = 'Failed to reset password. Please check the information entered.';
            this.successMessage = '';  
          }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.successMessage = '';
    }
  }
}
