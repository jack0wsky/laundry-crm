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
  softDeleted: boolean;
}

export interface PricingWithReports extends Pricing {
  reports: { amount: number; date: string }[];
}
