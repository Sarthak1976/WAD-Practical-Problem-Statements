import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  activeUser: any = null;

  constructor (private router: Router){}

  ngOnInit() {

    let storedUser = localStorage.getItem('angularLoggedInUser');
    if(storedUser){
      this.activeUser = JSON.parse(storedUser);
    }else{
      this.router.navigate(['/login']);
    }
  }

  logout(){
    localStorage.removeItem('angularLoggedInUser');
    this.router.navigate(['/login']);
  }


}
