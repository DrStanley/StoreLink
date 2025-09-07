import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { ImageService } from '../../../services/image.service';
import { Product } from '../../../models/product';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductComponent {
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private productService: ProductService, private imageService: ImageService) { }

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0)]]
  });

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async addProduct(): Promise<void> {
    if (this.productForm.valid && this.selectedFile) {
      const imageUrl = await this.imageService.uploadImage(this.selectedFile);
      const product: Product = {
        ...this.productForm.value,
        imageUrl
      };
      this.productService.addProduct(product);
    }
  }
}
