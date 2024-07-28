import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskListService } from 'src/app/services/task-list.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  getByIdData;
  getByIdDataSubscription;

  get title(): AbstractControl {
    return this.taskForm.get('title');
  }
  get taskDescription(): AbstractControl {
    return this.taskForm.get('taskDescription');
  }
  get assginedTo(): AbstractControl {
    return this.taskForm.get('assginedTo');
  }
  get completed(): AbstractControl {
    return this.taskForm.get('completed');
  }

  constructor(
    private taskService: TaskListService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getByIdDataSubscription = this.taskService.getByIdData.subscribe(
      (data) => {
        this.getByIdData = data;
      }
    );
    this.createTaskManagementForm();
  }

  createTaskManagementForm() {
    this.taskForm = this.fb.group({
      _id: [],
      title: [],
      taskDescription: [],
      assginedTo: [],
      completed: [],
    });
    if (this.getByIdData?._id) {
      this.setTaskFormValues();
    }
  }

  addTask() {
    if (!this.getByIdData?._id) {
      this.taskService.addTask(this.taskForm.value).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService
        .updateTask(this.getByIdData?._id, this.taskForm.value)
        .subscribe(() => {
          this.router.navigate(['/tasks']);
        });
    }
    this.taskForm.reset();
  }

  setTaskFormValues() {
    const { _id, title, taskDescription, assginedTo, completed } =
      this.getByIdData;
    const payload = {
      _id,
      title,
      taskDescription,
      assginedTo,
      completed,
    };
    this.taskForm.patchValue(payload);
  }

  ngOnDestroy(): void {
    this.getByIdDataSubscription.unsubscribe();
  }
}
