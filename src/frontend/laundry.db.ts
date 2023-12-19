import { clientDB } from "@/backend/supabase-client";
import { Pricing, ReportItem } from "@/shared/supabase";

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

    return data;
  },

  getProducts: async () => {
    const { data } = await clientDB
      .from(Table.Products)
      .select("*")
      .order("order", { ascending: true });

    return data;
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

    return data;
  },

  getAllPricings: async (): Promise<Pricing[]> => {
    const { data } = await clientDB
      .from(Table.Pricing)
      .select("*, product(id, name)")
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

  getAllReports: async (yearAndMonth: string): Promise<ReportItem[]> => {
    const { data } = await clientDB
      .from(Table.Reports)
      .select("*, product(id, name)");

    return (data || []).filter(
      (item) => item.date.includes(yearAndMonth) && item.amount > 0,
    );
  },

  setPrices: async (
    items: { hotel: string; product: number; price: number }[],
  ) => {
    await clientDB.from(Table.Pricing).upsert(items);
  },
};
