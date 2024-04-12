import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Notification } from '../interface/notification.interface';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  apiUrl=environment.apiURL

  constructor(private http: HttpClient) { }

  addNotification(notification: Notification) {
    return this.http.post(`${this.apiUrl}notifications`, notification);
 }
}
