import { Component, inject, OnInit } from "@angular/core";
import { UserProfile } from "@angular/fire/auth";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  currentUser :UserProfile | any = null;
  constructor(public authService:AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser();
   }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
