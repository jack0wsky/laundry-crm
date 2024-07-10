export interface LaundryProduct {
  id: number;
  name: string;
}

export interface Pricing {
  id: string;
  price: number;
  order: number;
  product: LaundryProduct;
  hotel: string;
}

export interface PricingWithReports extends Pricing {
  reports: { amount: number; date: string }[];
}
