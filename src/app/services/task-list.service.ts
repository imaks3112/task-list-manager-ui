import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Task {
  _id?: string;
  title: string;
  taskDetail: string;
  assginedTo: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  getByIdData = new BehaviorSubject('');

  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  storeGetByIdData(data) {
    this.getByIdData.next(data);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
