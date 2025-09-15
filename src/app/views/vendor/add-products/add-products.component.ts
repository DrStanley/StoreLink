import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { ImageService } from '../../../services/image.service';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductComponent implements OnInit {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  productId: string;
  vendorId: string | null;
  constructor(private fb: FormBuilder, private productService: ProductService, private imageService: ImageService,
    private loadingService: LoadingService, private route: ActivatedRoute, private authService: AuthService, private toastrService: ToastrService,) { }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.vendorId = this.authService.currentUser()?.uid;
    console.log(this.vendorId);

    if (this.productId) {
      // Editing an existing product
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        quantity: [0, Validators.required],
        active: [true, Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
      });

      this.loadingService.show();
      try {
        this.productService.getProductById(this.productId).pipe(first()).subscribe(product => {
          if (product) {
            this.productForm.patchValue(product);
            this.imagePreview = product.imageUrl;
          }
        });
      } catch (error) {
        this.toastrService.error('Error fetching product details', 'Error');
        console.error('Error fetching product details', error);
      } finally {
        this.loadingService.hide();
      }

    }

  }

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    quantity: [0, Validators.required],
    active: [true, Validators.required],
    price: [0, [Validators.required, Validators.min(1)]]
  });

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    // if (this.selectedFile) {
    //   this.productForm.patchValue({ image: this.selectedFile });
    //   this.productForm.get('image')?.updateValueAndValidity();
    // }
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  async saveProduct(): Promise<void> {
    const imageUrl = await this.imageService.uploadImage(this.selectedFile);
    this.loadingService.show();

    if (this.vendorId) {
      if (this.productId) {
        const updatedProduct: Partial<Product> = this.productForm.value;
        updatedProduct.imageUrl = imageUrl ?? this.imagePreview as string;
        await this.productService.updateProduct(this.productId, updatedProduct).finally(() => {
          this.loadingService.hide();
        });
        this.toastrService.success('Product updated successfully!');
      } else {
        if (this.productForm.valid && this.selectedFile) {
          const product: Product = {
            ...this.productForm.value,
            createdAt: new Date(),
            vendorId: this.vendorId,
            imageUrl
          };
          this.productService.addProduct(product).finally(() => {
            this.loadingService.hide();
          });
        }
      }
    } else {
      this.toastrService.error('Vendor not found. Please log in again.', 'Error');
    }
  }
}
