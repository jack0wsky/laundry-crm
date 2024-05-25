import type { Database } from "@/modules/services/supabase.types";
import type { Hotel } from "@/modules/hotels/types";
import type { Pricing } from "@/modules/hotels/pricing/types";
import type { Product } from "@/modules/comarch/types";
import { createClient } from "@supabase/supabase-js";
import { constructPdfFileName } from "@/modules/utils/construct-pdf-file-name";

const clientKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || "";
const serverKey = process.env.SUPABASE_API_KEY || "";

const apiKey = serverKey || clientKey;
export const clientDB = createClient<Database>(
  "https://wsphrpbhhpjdhfeuwixi.supabase.co",
  apiKey,
);

enum Table {
  Pricing = "pricing",
  Hotels = "hotels",
  Customers = "customers",
  Products = "products",
  Reports = "reports",
}

export interface CreatePricingItemPayload {
  price: number;
  product: number;
  hotel: string;
  order: number;
}

interface Customer {
  id: number;
  name: string;
  nip: number;
}

export const db = {
  auth: {
    login: async (email: string, password: string) => {
      const { data } = await clientDB.auth.signInWithPassword({
        email,
        password,
      });

      localStorage.setItem(
        "laundry-token",
        data.session?.access_token as string,
      );
    },

    logout: async () => {
      await clientDB.auth.signOut();
      localStorage.removeItem("laundry-token");
    },

    checkSession: async () => {
      const { data } = await clientDB.auth.getSession();

      return {
        accessToken: data.session?.access_token,
        expiration: data.session?.expires_at,
        user: data.session?.user,
      };
    },
  },

  addNewClient: async (payload: { nip: number; name: string }) => {
    await clientDB.from(Table.Customers).insert(payload);
  },

  hotels: {
    updateHotelName: async (id: string, name: string) => {
      await clientDB.from("hotels").update({ name }).eq("id", id);
    },

    addNew: async (payload: {
      name: string;
      customer: string;
      order: number;
    }) => {
      await clientDB.from(Table.Hotels).insert(payload);
    },

    getAll: async () => {
      const { data } = await clientDB
        .from(Table.Hotels)
        .select<"*, customer(*)", Hotel>("*, customer(*)")
        .order("order", { ascending: true });

      return data || [];
    },
  },

  reportProductAmount: async (
    hotelId: string,
    amount: number,
    date: string,
    productId: number,
    id: string,
  ) => {
    await clientDB
      .from(Table.Reports)
      .upsert({ amount, date, hotel: hotelId, product: productId, id });
  },

  getReportForDate: async (
    hotelId: string,
    date: string,
    productId: number,
  ) => {
    const { data } = await clientDB
      .from(Table.Reports)
      .select("*")
      .eq("hotel", hotelId)
      .eq("date", date)
      .eq("product", productId);

    return data || [];
  },

  getPricing: async (customerName: string) => {
    const { data } = await clientDB
      .from(Table.Pricing)
      .select<"*, product(id, name)", Pricing>("*, product(id, name)")
      .eq("hotel", customerName)
      .order("order", { ascending: true });

    return data || [];
  },

  getReport: async (hotelId: string, yearAndMonth: string) => {
    const { data } = await clientDB
      .from(Table.Reports)
      .select("*, product(id, name)")
      .eq("hotel", hotelId)
      .filter("date", "gte", `${yearAndMonth}-01`);

    return data || [];
  },

  pricing: {
    updateOne: async (id: string, updatedPrice: number) => {
      await clientDB
        .from(Table.Pricing)
        .update({ price: updatedPrice })
        .eq("id", id);
    },

    addNew: async (payload: CreatePricingItemPayload) => {
      await clientDB
        .from(Table.Pricing)
        .insert<CreatePricingItemPayload>(payload);
    },
  },

  downloadPDF: async (
    activeHotelName: string,
    activeMonth: number,
    activeYear: number,
  ) => {
    const { data } = await clientDB.storage
      .from("sheets")
      .createSignedUrl(
        constructPdfFileName(activeHotelName, activeMonth, activeYear),
        3600,
      );

    return data;
  },

  listProducts: async (): Promise<Product[]> => {
    const { data } = await clientDB
      .from(Table.Products)
      .select<"*", Product>("*");

    return data || [];
  },

  listCustomers: async () => {
    const { data } = await clientDB
      .from(Table.Customers)
      .select<"*", Customer>("*");

    return data || [];
  },
};
