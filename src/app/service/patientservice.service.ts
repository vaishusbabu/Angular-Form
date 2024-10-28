import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class patientService {
  private apiUrl = 'http://localhost:8083/api/users'; 
  private patientFirstName: string = '';
  private patientLastName: string = '';

  constructor(private http: HttpClient) { }

  register(Patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/register`, Patient);
  }
  

  login(healthCareNumber: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { healthCareNumber, email, password });
  }

  forgotPassword(healthCareNumber: string, email: string): Observable<any> {
    const request = { healthCareNumber, email };
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, request);
  }

  resetPassword(healthCareNumber: string, email: string, otp: string, newPassword: string, confirmPassword: string): Observable<any> {
    const request = { healthCareNumber, email, otp, newPassword, confirmPassword };
    return this.http.post<any>(`${this.apiUrl}/reset-password`, request);
  }

 
}
