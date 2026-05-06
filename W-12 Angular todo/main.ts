import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newTask: string = '';

  tasks: string[] = [];

  successMsg: string = '';
  errorMsg: string = '';

  addTask() {
    if (this.newTask.trim() !== ""){
      this.tasks.push(this.newTask.trim());
      this.newTask = '';
      this.successMsg = 'Task saved successfully !'
      this.errorMsg = '';
      setTimeout(() => {
        this.successMsg = '';
      }, 2000);
    }else{
      this.errorMsg = 'Please enter a task first!';
      this.successMsg = '';

      setTimeout(() => {
        this.errorMsg = '';
      }, 2000);
    }
  }

  editTask(i:number){
    this.newTask = this.tasks[i];
    this.deleteTask(i);
  }
  deleteTask(i:number){
    this.tasks.splice(i,1);
  }
}
