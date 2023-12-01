export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Customer {
  id: number;
  name: string;
  nip: number | null;
}

export interface Hotel {
  id: string;
  name: string;
  customer: Customer;
}

export interface LaundryProduct {
  id: number;
  name: string;
}

export interface ReportItem {
  amount: number | null;
  date: string;
  hotel: string | null;
  id: string;
  product: { id: number; name: string };
}

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: number;
          name: string;
          nip: number | null;
        };
        Insert: {
          id: number;
          name: string;
          nip?: number | null;
        };
        Update: {
          id?: number;
          name?: string;
          nip?: number | null;
        };
        Relationships: [];
      };
      hotels: {
        Row: {
          customer: Customer;
          id: string;
          name: string;
        };
        Insert: {
          customer?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          customer?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "hotels_customer_fkey";
            columns: ["customer"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["name"];
          },
        ];
      };
      pricing: {
        Row: {
          customer: string | null;
          id: string;
          price: number;
          product: { id: number | null; name: string };
        };
        Insert: {
          customer?: string | null;
          id?: string;
          price: number;
          product?: number | null;
        };
        Update: {
          customer?: string | null;
          id?: string;
          price?: number;
          product?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "pricing_customer_fkey";
            columns: ["customer"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "pricing_product_fkey";
            columns: ["product"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      reports: {
        Row: {
          amount: number | null;
          date: string;
          hotel: string | null;
          id: string;
          product: { id: number; name: string };
        };
        Insert: {
          amount?: number | null;
          date: string;
          hotel?: string | null;
          id?: string;
          product?: number | null;
        };
        Update: {
          amount?: number | null;
          date?: string;
          hotel?: string | null;
          id?: string;
          product?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "reports_hotel_fkey";
            columns: ["hotel"];
            isOneToOne: false;
            referencedRelation: "hotels";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reports_product_fkey";
            columns: ["product"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
