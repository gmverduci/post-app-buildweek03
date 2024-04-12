import { SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Auth } from 'src/app/interface/auth.interface';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Notification } from 'src/app/interface/notification.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user!: Auth | null | SocialUser
  notifications: Notification[] = [];


  constructor(private authsrv: AuthService, private notifSrv: NotificationsService) {}

  ngOnInit(): void {
    this.authsrv.user$.subscribe((data) => {
      this.user = data
    });
    this.notifSrv.notifications$.subscribe(
      (notifications: Notification[] | null) => {
        if (notifications) {
          this.notifications = notifications;
          console.log('Notifications:', this.notifications);
        }
      },
      (error) => {
        console.error('Error getting notifications:', error);
      }
    );

    // Richiedere le notifiche al servizio
    this.notifSrv.getNotifications();
  }
  logout() {
    this.authsrv.logout()
  }

  checkTypeOfAuthData(object: any): object is Auth {
    return 'user' in object
  }

  checkTypeOfSocialUser(object:any): object is SocialUser {
    return 'id' in object
  }


}
