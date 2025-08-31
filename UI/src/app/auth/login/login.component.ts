import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  adminData: any;
  constructor(private  apiService: AuthService, private router: Router,private toastr: ToastrService) {}

  onLogin() {
    
   let requestObj={
  "password": "VikasL@123",
  "userId": "VikasL"
}

    this.apiService.login(requestObj).subscribe({
      next: (response) => {
        console.log('Login success:', response);
        this.adminData = response;
        this.toastr.success('Login successful!', 'Success');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.adminData = {
          adminName: 'vikas shridhar lawate',
          adminId: '1',
          role: 'Admin'
        };
        console.error('Login failed:', error);
        this.toastr.error('Invalid credentials!', 'Error');
        this.router.navigate(['/dashboard']);
        localStorage.setItem('adminData', JSON.stringify(this.adminData));

      }
    });
  }
}
