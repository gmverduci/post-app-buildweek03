import { Component, OnInit } from '@angular/core';
import { ToDo } from 'src/app/interface/to-do';
import { User } from 'src/app/interface/user.interface';
import { ToDoServiceService } from 'src/app/services/to-do-service.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  toDo: ToDo[] = []
  users: User[] = []

  constructor(private toDoSrv: ToDoServiceService) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
