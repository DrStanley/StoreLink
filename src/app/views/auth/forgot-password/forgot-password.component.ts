import { Component, inject, signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';

  constructor(private authService:AuthService) { }
  async sendResetEmail(): Promise<void> {

    await this.authService.sendPasswordResetEmail(this.email);
    // this.toastr.success('Password reset email sent. Please check your inbox.', 'Success');
  }
}
