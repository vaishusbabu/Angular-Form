import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { patientService } from '../../service/patientservice.service'; 

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  
  loginData = {
    healthCareNumber: '',
    email: ''
  };

  constructor(private patientService: patientService) {}

  generateOtp() {
    if (!this.loginData.healthCareNumber || !this.loginData.email) {
      alert('Please fill in all required fields correctly.');
      return;
    }
  
    this.patientService.forgotPassword(this.loginData.healthCareNumber, this.loginData.email).subscribe({
      next: (response) => {
        console.log('Backend Response:', response); // Added for debugging
        if (response && response.success) {
          alert(response.message || 'OTP has been sent to your email.');
        }
         else {
          alert(response.message || 'An error occurred while sending OTP. Please try again.');
        }
      },

      error: (error) => {
        console.log('Error:', error); 
       
        if (error.status === 404 && error.error?.message === 'Email not found') {
          alert('The email does not exist. Please enter a valid email.');
        } else if (error.status === 422 && error.error?.message === 'Health care number not found') {
          alert('The health care number does not exist. Please enter a valid health care number.');
        } else if (error.status === 500) {
          alert('An internal server error occurred. Please try again later.');
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      }
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted', this.loginData);
    }
  }
}
