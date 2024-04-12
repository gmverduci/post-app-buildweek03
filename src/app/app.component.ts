import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { User } from './interface/user.interface';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'post-app-buildweek03';
  users!: User[];
  user!: User;

  constructor(private userSrvc: UsersService, private authSrv: AuthService) { 
    this.userSrvc.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users)
    })

    this.userSrvc.getUser(3).subscribe((data) =>{
      this.user = data;
      console.log(this.user)
    })
  }

  ngOnInit(): void {
    this.authSrv.restore()
  }

}
