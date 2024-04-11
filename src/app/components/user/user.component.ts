import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users!: User[];
  user!: User;

  constructor(private userSrvc: UsersService) { }

  ngOnInit(): void {
    this.userSrvc.getUsers().subscribe((data) => {
      this.users = data;
      
    })
  }
}
