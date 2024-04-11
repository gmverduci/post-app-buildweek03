import { SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Auth } from 'src/app/interface/auth.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user!: Auth | null | SocialUser

  constructor(private authsrv: AuthService) {}

  ngOnInit(): void {
    this.authsrv.user$.subscribe((data) => {
      this.user = data
    })
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
