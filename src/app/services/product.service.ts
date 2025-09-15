import { Injectable, inject } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Firestore, collection, addDoc, collectionData, query, where, doc, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsCollection = collection(this.firestore, 'products');

  constructor(private firestore:Firestore,private toastrService: ToastrService,) {}

  getProducts(): Observable<Product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  getProductById(id: string): Observable<Product | undefined> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return docData(productDoc, { idField: 'id' }) as Observable<Product | undefined>;
  }

  getProductsByVendor(vendorId: string): Observable<Product[]> {
    const q = query(this.productsCollection, where('vendorId', '==', vendorId));
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<void> {
    try {
      await addDoc(this.productsCollection, product);
      console.log('Product added successfully!');
      this.toastrService.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product', error);
      this.toastrService.error(error, 'Error adding product');

    }
  }
  async updateProduct(productId: string, product: Partial<Product>): Promise<void> {
    const productDoc = doc(this.firestore, `products/${productId}`);
    await updateDoc(productDoc, product);
  }
  async deleteProduct(productId: string): Promise<void> {
    const productDoc = doc(this.firestore, `products/${productId}`);
    await deleteDoc(productDoc);
  }
}
