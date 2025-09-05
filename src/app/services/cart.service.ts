import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = signal<CartItem[]>([]);

  public getCart() {
    return this.cart.asReadonly();
  }

  public addToCart(product: Product) {
    this.cart.update(cart => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            return cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            return [...cart, { ...product, quantity: 1 }];
        }
    });
  }

  public removeFromCart(productId: string) {
    this.cart.update(cart => cart.filter(item => item.id !== productId));
  }

  public getCartTotal() {
    return computed(() => this.cart().reduce((total, item) => total + item.price * item.quantity, 0));
  }

   public getCartCount() {
    return computed(() => this.cart().reduce((count, item) => count + item.quantity, 0));
  }
}
