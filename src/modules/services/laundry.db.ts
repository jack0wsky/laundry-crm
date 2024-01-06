import type { Database } from "@/modules/services/supabase.types";
import type { Hotel } from "@/modules/hotels/types";
import type { Pricing } from "@/modules/hotels/pricing/types";
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

export const db = {
  login: async (email: string, password: string) => {
    const { data } = await clientDB.auth.signInWithPassword({
      email,
      password,
    });

    localStorage.setItem("laundry-token", data.session?.access_token as string);
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
    };
  },

  getHotels: async () => {
    const { data } = await clientDB
      .from(Table.Hotels)
      .select("*, customer(*)")
      .order("order", { ascending: true });

    return data as Hotel[];
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
      .select("*, product(id, name)")
      .eq("hotel", customerName)
      .order("order", { ascending: true });

    return data as Pricing[];
  },

  getReport: async (hotelId: string, yearAndMonth: string) => {
    const { data } = await clientDB
      .from(Table.Reports)
      .select("*, product(id, name)")
      .eq("hotel", hotelId);

    return (data || []).filter((item) => item.date.includes(yearAndMonth));
  },

  updatePrice: async (id: string, updatedPrice: number) => {
    await clientDB
      .from(Table.Pricing)
      .update({ price: updatedPrice })
      .eq("id", id);
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
};
