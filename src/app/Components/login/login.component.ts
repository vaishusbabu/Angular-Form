import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { RegistrationComponent } from '../registration/registration.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { patientService } from '../../service/patientservice.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ForgotpasswordComponent, RegistrationComponent, RouterOutlet, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: { healthCareNumber: string; email: string; password: string } = {
    healthCareNumber: '',
    email: '',
    password: '',
  };

  toasterMessage: string = ''; 
  showToaster: boolean = false; 
  isSuccess: boolean = true; 

  constructor(private patientService: patientService, private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      const { healthCareNumber, email, password } = this.loginData;

      this.patientService.login(healthCareNumber, email, password)
        .subscribe(response => {
          console.log('Login successful', response);

          if (response && response.patientFirstName && response.patientLastName) {
            const patientName = `${response.patientFirstName} ${response.patientLastName}`;
            localStorage.setItem('patientName', patientName); // Store patient name
            console.log('patientName', patientName);

            this.showToasterMessage('Login successful!', true); // Show success message
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Patient name not found in response:', response);
            this.showToasterMessage('Login failed. Patient details not found.', false); // Show error message
          }
        }, error => {
          console.error('Login failed', error);
          this.showToasterMessage('Login failed. Please check your credentials.', false); // Show error message
        });
    }
  }

  showToasterMessage(message: string, success: boolean) {
    this.toasterMessage = message;
    this.isSuccess = success;
    this.showToaster = true;

    setTimeout(() => {
      this.showToaster = false;
    }, 3000); // Hide toaster after 3 seconds
  }
}
