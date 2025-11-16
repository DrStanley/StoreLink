import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { VendorComponent } from "./layouts/vendor/vendor/vendor.component";

// vendor views
import { AddProductComponent } from "./views/vendor/add-products/add-products.component";
import { ProductsComponent } from "./views/vendor/products/products.component";
import { DashboardComponent as VendorDashboardComponent } from "./views/vendor/dashboard/dashboard.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { authGuard } from "./guards/auth.guard";
import { ForgotPasswordComponent } from "./views/auth/forgot-password/forgot-password.component";
import { StoreComponent } from "./views/store/store/store.component";
import { StoreProductsComponent } from "./views/store/store-products/store-products.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [authGuard],
    data: { role: 'admin' },
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // vendor views
  {
    path: "vendor",
    component: VendorComponent,
    canActivate: [authGuard],
    data: { role: 'vendor' },
    children: [
      { path: "dashboard", component: VendorDashboardComponent },
      { path: "products", component: ProductsComponent },
      { path: "products/add", component: AddProductComponent },
      { path: "products/:id", component: AddProductComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },

  // store
  {
    path: "store",
    component: StoreComponent,
    children: [
      { path: "products", component: StoreProductsComponent },
      { path: "", redirectTo: "products", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: LandingComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
