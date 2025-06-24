import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import e, { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router,private http: HttpClient) {
    console.log('LoginComponent initialized');
   }
  title = 'Admin-panel';
  username: string = '';
  password: string = '';
   showPassword = false;

  login() {
    // Implement your login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    const params = {userName:this.username, password:this.password};
    this.http.get<any>("http://localhost:8080/user/login",{params}).subscribe(response=>{
        if(response.isExist === true) {
          console.log('Login successful:'); 
          this.router.navigate(['/dashboard']);
        }else {
          alert('Login failed. Please Provide Valid Username & Password.');
        }
      } ,error => {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }

  )}
   togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
