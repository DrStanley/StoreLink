import { Component } from '@angular/core';

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.css']
})
export class StoreProductsComponent {
resetFilters() {
throw new Error('Method not implemented.');
}
minPrice: any;
maxPrice: any;
minRating: any;
onFilterChange() {
throw new Error('Method not implemented.');
}
  products = [
    {
      name: 'Cute Soft Teddybear',
      price: 285,
      oldPrice: 345,
      rating: 4,
      image: 'assets/bootstrap.jpg',
    },
    {
      name: 'MacBook Air Pro',
      price: 650,
      oldPrice: 900,
      rating: 3,
      image: 'assets/mac.jpg',
    },
    {
      name: 'Gaming Console',
      price: 25,
      oldPrice: 31,
      rating: 4,
      image: 'assets/console.jpg',
    },
    {
      name: 'Boat Headphone',
      price: 50,
      oldPrice: 65,
      rating: 3,
      image: 'assets/headphone.jpg',
    },
    {
      name: 'Toy Dino for Fun',
      price: 210,
      oldPrice: 250,
      rating: 4,
      image: 'assets/dino.jpg',
    },
    {
      name: 'Red Velvet Dress',
      price: 150,
      oldPrice: 200,
      rating: 5,
      image: 'assets/angular.jpg',
    }, {
      name: 'Cute Soft Teddybear',
      price: 285,
      oldPrice: 345,
      rating: 4,
      image: 'assets/bootstrap.jpg',
    },
    {
      name: 'MacBook Air Pro',
      price: 650,
      oldPrice: 900,
      rating: 3,
      image: 'assets/mac.jpg',
    },
    {
      name: 'Gaming Console',
      price: 25,
      oldPrice: 31,
      rating: 4,
      image: 'assets/console.jpg',
    },
    {
      name: 'Boat Headphone',
      price: 50,
      oldPrice: 65,
      rating: 3,
      image: 'assets/headphone.jpg',
    },
    {
      name: 'Toy Dino for Fun',
      price: 210,
      oldPrice: 250,
      rating: 4,
      image: 'assets/dino.jpg',
    },
    {
      name: 'Red Velvet Dress',
      price: 150,
      oldPrice: 200,
      rating: 5,
      image: 'assets/angular.jpg',
    }
  ];
selectedCategory: any;

  constructor() {
  }
}
