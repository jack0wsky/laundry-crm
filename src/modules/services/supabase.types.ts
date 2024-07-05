export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: number;
          laundryId: string | null;
          name: string;
          nip: number | null;
        };
        Insert: {
          id: number;
          laundryId?: string | null;
          name: string;
          nip?: number | null;
        };
        Update: {
          id?: number;
          laundryId?: string | null;
          name?: string;
          nip?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "customers_laundryId_fkey";
            columns: ["laundryId"];
            isOneToOne: false;
            referencedRelation: "laundries";
            referencedColumns: ["id"];
          },
        ];
      };
      hotelProducts: {
        Row: {
          hotel: string;
          id: string;
          order: number | null;
          product: string | null;
        };
        Insert: {
          hotel: string;
          id?: string;
          order?: number | null;
          product?: string | null;
        };
        Update: {
          hotel?: string;
          id?: string;
          order?: number | null;
          product?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "hotelProducts_hotel_fkey";
            columns: ["hotel"];
            isOneToOne: false;
            referencedRelation: "hotels";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "hotelProducts_product_fkey";
            columns: ["product"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["name"];
          },
        ];
      };
      hotels: {
        Row: {
          customer: string | null;
          displayName: string | null;
          id: string;
          laundryId: string | null;
          name: string;
          order: number;
        };
        Insert: {
          customer?: string | null;
          displayName?: string | null;
          id?: string;
          laundryId?: string | null;
          name: string;
          order?: number;
        };
        Update: {
          customer?: string | null;
          displayName?: string | null;
          id?: string;
          laundryId?: string | null;
          name?: string;
          order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "hotels_customer_fkey";
            columns: ["customer"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "hotels_laundryId_fkey";
            columns: ["laundryId"];
            isOneToOne: false;
            referencedRelation: "laundries";
            referencedColumns: ["id"];
          },
        ];
      };
      laundries: {
        Row: {
          id: string;
          name: string;
          owner: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          owner?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          owner?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "laundries_owner_fkey";
            columns: ["owner"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      pricing: {
        Row: {
          hotel: string | null;
          id: string;
          order: number | null;
          price: number;
          product: number | null;
        };
        Insert: {
          hotel?: string | null;
          id?: string;
          order?: number | null;
          price: number;
          product?: number | null;
        };
        Update: {
          hotel?: string | null;
          id?: string;
          order?: number | null;
          price?: number;
          product?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "pricing_hotel_fkey";
            columns: ["hotel"];
            isOneToOne: false;
            referencedRelation: "hotels";
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
          laundryId: string | null;
          name: string;
          order: number | null;
        };
        Insert: {
          id: number;
          laundryId?: string | null;
          name: string;
          order?: number | null;
        };
        Update: {
          id?: number;
          laundryId?: string | null;
          name?: string;
          order?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_laundryId_fkey";
            columns: ["laundryId"];
            isOneToOne: false;
            referencedRelation: "laundries";
            referencedColumns: ["id"];
          },
        ];
      };
      reports: {
        Row: {
          amount: number | null;
          date: string;
          hotel: string | null;
          id: string;
          product: number | null;
        };
        Insert: {
          amount?: number | null;
          date: string;
          hotel?: string | null;
          id: string;
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
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
