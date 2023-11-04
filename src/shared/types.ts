export interface Product {
  name: string;
  amount: number;
  price: number;
}

export interface Client {
  name: string;
  products: Product[];
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

enum PaymentStatus {
  NotPaid,
  Paid,
  PartiallyPaid,
}

enum InvoiceType {
  Netto,
  Brutto,
}

interface CreateItem {
  ProductId: string;
  Quantity: number;
}

interface CreateInvoice {
  PurchasingPartyId: string;
  PaymentTypeId: string;
  ProductCurrencyPrice: string;
  PaymentStatus?: PaymentStatus;
  OSSProcedureCountryCode?: string;
  IsOSSProcedure?: boolean;
  ReceivingPartyId?: string;
  PaymentDeadline?: string;
  BankAccountId?: string;
  SalesDate?: string;
  InvoiceType?: InvoiceType;
  Items?: CreateItem[];
  ProductDescription?: string;
  Description?: string;
  IssueDate?: string;
}
