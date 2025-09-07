import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { LoadingService } from "src/app/services/loading.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private loadingService: LoadingService) { } 
  
  ngOnInit(): void {

  }
  
  login(): void {
    this.loadingService.show();
    this.authService.signIn(this.email, this.password).subscribe(() => {
      const user = this.authService.currentUser();
      console.log(user, 'logged in user');
      
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
