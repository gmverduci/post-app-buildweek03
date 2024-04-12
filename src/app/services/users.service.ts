import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

getUserByUsername(username: string) {
  return this.getUsers().pipe(
      map((users: User[]) => users.find((user: { username: string; }) => user.username === username) || null)
  );
}
}
