export interface Product {
  id: string;
  name: string;
  price: number;
  active: boolean;
  vendorId: string;
  description: string;
  createdAt: Date;
  imageUrl: string;
}
