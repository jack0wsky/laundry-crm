export interface Product {
  name: string;
  amount: number;
  price: number;
}
export interface Spreadsheet {
  name: string;
  products: Product[];
}
