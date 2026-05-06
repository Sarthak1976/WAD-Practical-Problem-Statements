import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginData={'username':'','password':''}; 
  errorMsg = "";

  constructor (private router:Router){}

  onLogin() {
    let registeredUsers = JSON.parse(localStorage.getItem('angularUsers') || '[]');

    let validUser = registeredUsers.find((u:any) => u.username === this.loginData.username && u.password === this.loginData.password);

    if(validUser){
      localStorage.setItem('angularLoggedInUser',JSON.stringify(validUser));
      this.router.navigate(['/profile']);
    }else{
      this.errorMsg = "Invalid Username or Password!"
    }
  }

}
