import { TurnoversListing } from "@/modules/analytics/TurnoversListing";

export const TurnoversPage = () => (
  <section className="w-full h-screen ml-[300px] px-5 py-4">
    <h1 className="text-4xl font-bold">Obroty</h1>
    <TurnoversListing />
  </section>
);
