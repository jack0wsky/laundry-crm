export enum PaymentStatus {
  NotPaid,
  Paid,
  PartiallyPaid,
}

enum InvoiceType {
  Netto,
  Brutto,
}

interface CreateItem {
  ProductId: number;
  Quantity: number;
}

export interface Report {
  amount: number;
  date: string;
  hotel: string;
  id: string;
  product: { id: number; name: string };
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
