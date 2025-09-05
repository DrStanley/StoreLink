import { Component, inject, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  public authService = inject(AuthService);

  constructor() { }

  ngOnInit() { }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
