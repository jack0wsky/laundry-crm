import type { Hotel } from "@/modules/hotels/types";
import type { Pricing } from "@/modules/hotels/pricing/types";
import type { Product } from "@/modules/comarch/types";
import { createClient } from "@/lib/auth/supabase/client";
import { constructPdfFileName } from "@/modules/utils/construct-pdf-file-name";
import { getDaysInMonth } from "date-fns";

export const clientDB = createClient();

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

export type CustomersHotel = Pick<Hotel, "id" | "name" | "displayName">;

export interface CustomerWithHotels extends Customer {
  hotels: CustomersHotel[];
}

export interface AddCustomerPayload {
  id: number;
  name: string;
  nip: number;
  laundryId: string;
}

export const db = {
  auth: {
    login: async (email: string, password: string) => {
      const { data } = await clientDB.auth.signInWithPassword({
        email,
        password,
      });

      return data;
    },

    checkSession: async () => {
      const { data } = await clientDB.auth.getSession();

      return data;
    },
  },

  addNewClient: async (payload: { nip: number; name: string }) => {
    await clientDB.from(Table.Customers).insert(payload);
  },

  hotels: {
    updateHotelName: async (id: string, name: string) => {
      await clientDB.from(Table.Hotels).update({ name }).eq("id", id);
    },

    getOneById: async (id: string) => {
      const { data } = await clientDB
        .from(Table.Hotels)
        .select<"*", Hotel>("*")
        .eq("id", id)
        .single();

      return data;
    },

    addNew: async (payload: {
      name: string;
      customer: string;
      order: number;
    }) => {
      const { data } = await clientDB
        .from(Table.Hotels)
        .insert(payload)
        .select<"*", Hotel>();
      return data;
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
    const days = getDaysInMonth(new Date(`${yearAndMonth}-01`));
    const { data } = await clientDB
      .from(Table.Reports)
      .select("*, product(id, name)")
      .eq("hotel", hotelId)
      .filter("date", "gte", `${yearAndMonth}-01`)
      .filter("date", "lte", `${yearAndMonth}-${days}`);

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

  customers: {
    updateOne: async (
      customerId: number,
      payload: Partial<AddCustomerPayload>,
    ) => {
      await clientDB.from(Table.Customers).update(payload).eq("id", customerId);
    },
    addNew: async (payload: AddCustomerPayload) => {
      await clientDB.from(Table.Customers).insert(payload);
    },
    listAll: async () => {
      const { data } = await clientDB
        .from(Table.Customers)
        .select<"*", Customer>("*");

      return data || [];
    },
    listAllWithHotels: async () => {
      const { data, error } = await clientDB
        .from(Table.Customers)
        .select<string, CustomerWithHotels>("*, hotels(id, name, displayName)");

      return data;
    },
  },
};
