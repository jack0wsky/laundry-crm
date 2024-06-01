export interface Product {
  id: number;
  name: string;
  order: number;
}

export enum CustomerType {
  Individual,
  Company,
}

enum CustomerStatus {
  Domestic,
  IntraEU,
  NonEU,
  IntraEUTripartite,
  OSSProcedure = 10,
}

export interface ComarchCustomer {
  Id: number;
  Name: string;
  CountryCode: string;
  CustomerTaxNumber: string;
  CustomerCode: string;
  Mail: string;
  PhoneNumber: string;
  CustomerType: CustomerType;
  Address: {
    Street: string;
    BuildingNumber: string;
    FlatNumber: string;
    City: string;
    PostalCode: string;
    Id: string;
  };
  CustomerStatus: CustomerStatus;
}

export interface CreateComarchCustomerPayload {
  Name: string;
  CountryCode?: string;
  CustomerTaxNumber?: string;
  CustomerCode?: string;
  Mail?: string;
  PhoneNumber?: string;
  CustomerType?: CustomerType;
  Address?: {
    Street: string;
    BuildingNumber: string;
    FlatNumber: string;
    City: string;
    PostalCode: string;
  };
  CustomerStatus?: CustomerStatus;
}

export interface ComarchCustomerReadModel {
  name: string;
  countryCode: string;
  customerTaxNumber: string;
  customerCode: string;
  mail: string;
  phoneNumber: string;
  customerType: CustomerType;
  address: {
    street: string;
    buildingNumber: string;
    flatNumber: string;
    city: string;
    postalCode: string;
    id: string;
  };
  customerStatus: CustomerStatus;
  id: number;
}
