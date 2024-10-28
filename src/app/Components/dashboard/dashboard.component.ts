import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; // Correct import
import { CommonModule } from '@angular/common'; // Add CommonModule if not already imported

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  patientName: string = '';

  constructor(private router: Router) {
    this.patientName = localStorage.getItem('patientName') || 'Patient'; 
  }

  navigateToLogin() {
    localStorage.removeItem('patientName'); 
    this.router.navigate(['/']); 
  }
}
