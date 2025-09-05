import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
  }
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  login(): void {
    this.authService.signIn(this.email, this.password).subscribe(() => {
      const user = this.authService.currentUser();
      if (user) {
        switch (user.role) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'vendor':
            this.router.navigate(['/vendor']);
            break;
          default:
            this.router.navigate(['/profile']);
            break;
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
