import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    debugger
    // Dummy login - replace with API call
    // if (this.email && this.password) {
    //   this.auth.login('dummy-jwt-token');
    //   this.router.navigate(['/auth/otp']); // go to OTP page
    // }

    this.router.navigate(['/dashboard']);
  }
}
