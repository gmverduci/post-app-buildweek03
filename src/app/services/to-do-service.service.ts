import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from '../interface/to-do';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ToDoServiceService {
  toDo: ToDo[] = []
  users: User[] = []

  constructor(private http: HttpClient) { }

  getList() {
    return this.toDo
  }

  getUsers() {
    return this.users
  }

  getUserById(userId: number): string {
    const todo = this.toDo.find(todo => todo.userId === userId);
    if (todo) {
      const user = this.users.find(user => user.id === userId);
      if (user) {
        return user.name + ' - ' + user.company;
      }
      return 'Utente non trovato';
    }
    return 'To do non trovato per questo utente';
  }

  toggleCompletion(index: number): void {
    const todo = this.toDo[index];
    todo.completed = !todo.completed;
  }



}
