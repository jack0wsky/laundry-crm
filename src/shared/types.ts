export interface SpreadsheetProduct {
  name: string;
  amount: number;
  price: number;
}

export interface Client {
  name: string;
  products: SpreadsheetProduct[];
}

interface PurchasingParty {
  Name: string;
  NipPrefix: string;
  Nip: string;
  Country: string;
  City: string;
  Street: string;
  BuildingNumber: string;
  FlatNumber: string;
  BankName: string;
  BankAccountNumber: string;
  CustomerType: number;
}

interface Item {
  ProductId: any;
  Quantity: number;
  ProductCurrencyPrice: number;
  ProductPrice: number;
  ProductName: string;
  ProductDescription: string;
  UnitOfMeasurement: string;
  VatRateId: number;
  Id: number;
}

interface Invoice {
  NetTotal: number;
  CurrencyNetTotal: number;
  GrossTotal: number;
  CurrencyGrossTotal: number;
  VatTotal: number;
  CurrencyVatTotal: number;
  CurrencyCode: string;
  CurrencyRateType: number;
  CurrencyRateDate: string;
  CurrencyConverter: number;
  CurrencyRate: number;
  PaymentStatus: number;
  OSSProcedureCountryCode: string;
  IsOSSProcedure: boolean;
  IsFinal: boolean;
  PurchasingParty: PurchasingParty;
  Items: Item[];
}

export enum PaymentStatus {
  NotPaid,
  Paid,
  PartiallyPaid,
}

enum InvoiceType {
  Netto,
  Brutto,
}

export interface CreateItem {
  ProductId: number;
  Quantity: number;
}

export interface ClientProduct extends CreateItem {
  Name: string;
  Price: number;
}

export interface CreateInvoice {
  PurchasingPartyId: number;
  PaymentTypeId: number;
  ProductCurrencyPrice: number;
  PaymentStatus?: PaymentStatus;
  OSSProcedureCountryCode?: string;
  IsOSSProcedure?: boolean;
  ReceivingPartyId?: string;
  PaymentDeadline?: string;
  BankAccountId?: number;
  SalesDate?: string;
  InvoiceType?: InvoiceType;
  Items?: CreateItem[];
  ProductDescription?: string;
  Description?: string;
  IssueDate?: string;
}

export interface ERPProduct {
  Description: string;
  Id: number;
  ItemCode: string;
  Name: string;
  ProductCode: string;
  ProductType: number;
  Quantity: number;
  Rate: number;
  SaleGrossPrice: number;
  SaleNetPrice: number;
  UnitOfMeasurement: string;
}

export interface ERPProductReadModel {
  id: number;
  name: string;
}

export interface PaymentMethod {
  Name: string;
  Primary: boolean;
  Deadline: number;
  Type: number;
  Id: number;
}

export interface Customer {
  Name: string;
  CountryCode: string;
  CustomerTaxNumber: string;
  CustomerCode: string;
  Mail: string;
  PhoneNumber: string;
  CustomerType: number;
  Address: {
    Street: string;
    BuildingNumber: string;
    FlatNumber: string;
    PostalCode: string;
    City: string;
    Id: number;
  };
  CustomerStatus: number;
  Id: number;
}
