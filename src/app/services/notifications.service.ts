import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Notification } from '../interface/notification.interface';
import { catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  apiUrl=environment.apiURL

  constructor(private http: HttpClient) { }

  addNotification(notification: Notification) {
    console.log('addNotification called with:', notification); // Log the notification object being passed

    return this.http.post(`${this.apiUrl}notifications`, notification).pipe(
        tap((response) => {
            console.log('Notification added successfully:', response); // Log the response from the server
        }),
        catchError((error) => {
            console.error('Error adding notification:', error); // Log any errors that occur
            return throwError('Something went wrong with adding notification.');
        })
    );
}
}
