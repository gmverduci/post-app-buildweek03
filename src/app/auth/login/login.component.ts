import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    @ViewChild('container') container!: ElementRef;

    signIn() {
        this.container.nativeElement.classList.remove('right-panel-active');
    }

    signUp() {
        this.container.nativeElement.classList.add('right-panel-active');
    }

    authSubscription!: Subscription;

    constructor(private authService: SocialAuthService) {}
    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    ngOnInit() {
        this.authSubscription = this.authService.authState.subscribe((user) => {
            console.log('user', user);
        });
    }

    googleSignin(googleWrapper: any) {
        googleWrapper.click();
    }
}
