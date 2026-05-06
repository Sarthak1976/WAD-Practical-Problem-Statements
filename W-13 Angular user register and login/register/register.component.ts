import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  user = {
    name: '',
    username:'',
    password:''
  }

  errorMsg : string = '';

  constructor(private router: Router){}

  onRegister(){
    if(!this.user.name || !this.user.username || !this.user.password){
      this.errorMsg = "Please fill all fields!";
      setTimeout(() => {
        this.errorMsg = "";
      }, 2000);
      return;
    }

    let usersArray = JSON.parse(localStorage.getItem('angularUsers') || '[]');

    usersArray.push(this.user);

    localStorage.setItem('angularUsers',JSON.stringify(usersArray));

    alert('Registration Successful!');
    this.router.navigate(['/login']);
  }
  

}
