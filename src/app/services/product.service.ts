import { Injectable, inject } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Firestore, collection, addDoc, collectionData, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsCollection = collection(this.firestore, 'products');

  constructor(private firestore:Firestore) {}

  getProducts(): Observable<Product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  getProductById(id: string): Observable<Product | undefined> {
    // This needs to be implemented with a proper query
    return of(undefined);
  }

  getProductsByVendor(vendorId: string): Observable<Product[]> {
    const q = query(this.productsCollection, where('vendorId', '==', vendorId));
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<void> {
    try {
      await addDoc(this.productsCollection, product);
      console.log('Product added successfully!');
    } catch (error) {
      console.error('Error adding product', error);
    }
  }
}
