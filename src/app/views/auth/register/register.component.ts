import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserRole } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})

export class RegisterComponent {
  email = '';
  name = '';
  password = '';
  confirmPassword = '';
  role: UserRole = 'vendor';
  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.signUp(this.name, this.email, this.password, this.role).subscribe(() => {
      this.router.navigate(['auth/login']);
    });
  }
}