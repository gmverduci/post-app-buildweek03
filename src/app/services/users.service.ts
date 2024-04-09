import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../interface/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

getUsers() {
  return this.http.get<User[]>(`${this.apiUrl}users`)
}

getUser(id: number) {
return this.http.get<User>(`${this.apiUrl}users/${id}`)
}
}
