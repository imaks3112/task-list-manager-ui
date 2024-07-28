import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskListService } from 'src/app/services/task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks:any = [];
  messageClose = false;

  constructor(private taskService: TaskListService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  addNewTask() {
    this.messageClose = true;
    this.taskService.storeGetByIdData(null);
    this.router.navigate(['/add-task']);
  }

  editTasks(taskData) {
    this.taskService.storeGetByIdData(taskData);
    this.router.navigate(['/add-task']);
  }

  closeMessage() {
    setTimeout(() => {
      this.messageClose = false;
    }, 1000);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}
