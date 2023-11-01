export interface Product {
  name: string;
  amount: number;
  price: number;
}

export interface Client {
  name: string;
  products: Product[];
}
