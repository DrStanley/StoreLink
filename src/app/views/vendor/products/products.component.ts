import { Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private router = inject(Router);
  private loadingService = inject(LoadingService);
  private toastrService = inject(ToastrService);
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  private vendorId$ = toObservable(computed(() => this.authService.currentUser()?.uid));

  products = toSignal(
    this.vendorId$.pipe(
      tap(() => this.loadingService.show()),
      switchMap(id => {
        if (id) {
          return this.productService.getProductsByVendor(id);
        }
        return of([]);
      }),
      tap(() => this.loadingService.hide())
    )
  );

  goToUpdate(productId: string): void {
    this.router.navigate(['/vendor/update-product', productId]);
  }
  async deleteProduct(productId: string): Promise<void> {
    this.loadingService.show();
    try {
      await this.productService.deleteProduct(productId);
      this.toastrService.success('Product deleted successfully!');
    } catch (error) {
      this.toastrService.error(error, 'Error deleting product');
      console.error('Error deleting product', error);
    } finally {
      this.loadingService.hide();
    }
  }

}
