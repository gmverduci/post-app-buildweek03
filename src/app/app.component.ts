import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { User } from './interface/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'post-app-buildweek03';
  users!: User[];
  user!: User;

  constructor(private userSrvc: UsersService) { 
    this.userSrvc.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users)
    })

    this.userSrvc.getUser(3).subscribe((data) =>{
      this.user = data;
      console.log(this.user)
    })
  }

}
