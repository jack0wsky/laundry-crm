export interface Customer {
  id: number;
  name: string;
  nip: number | null;
}

export interface Hotel {
  id: string;
  name: string;
  displayName: string | null;
  customer: Customer;
}
