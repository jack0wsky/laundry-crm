import { useEffect, useState } from "react";
import { useListPaymentMethods } from "@/frontend/api/comarch-erp/payment-methods.controller";
import { clientDB } from "@/backend/supabase-client";
import { useListHotels } from "@/frontend/api/laundry/hotels.controller";
import { Hotel } from "@/shared/supabase";
import { AuthProvider } from "@/frontend/Auth.context";
import { Login } from "@/frontend/components/Login";
import { ReportProductsTable } from "@/frontend/components/ReportProductsTable";
import { Header } from "@/frontend/components/Header";
import { Clients } from "@/frontend/components/clients";

export default function Home() {
  const [activeHotel, setActiveHotel] = useState<Hotel | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeDate, setActiveDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { hotels } = useListHotels();
  const { paymentMethods } = useListPaymentMethods();

  useEffect(() => {
    if (hotels.length === 0) return setActiveHotel(null);

    setActiveHotel(hotels[0]);
  }, [hotels]);

  const nextMonth = () => {
    setActiveDate((prev) => {
      if (prev.month === 11) {
        return { month: 0, year: prev.year + 1 };
      }
      return { ...prev, month: prev.month + 1 };
    });
  };

  const previousMonth = () => {
    setActiveDate((prev) => {
      if (prev.month === 0) {
        return { month: 11, year: prev.year - 1 };
      }
      return { ...prev, month: prev.month - 1 };
    });
  };

  const transfer = paymentMethods.find((method) => method.name === "Przelew");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<{
    name: string;
    id: number;
  }>({ name: transfer?.name || "Przelew", id: transfer?.id || 0 });

  const migrate = async () => {
    const data = {
      name: "STOWARZYSZENIE UNICORN",
      id: 11623200,
      nip: 6751213389,
      objects: ["unicorn"],
      products: [
        { productName: "poszwa", price: 3.0, productId: 10763537 },
        { productName: "poszewka", price: 1.73, productId: 10763541 },
        { productName: "prześcieradło małe", price: 2.95, productId: 10763549 },
        { productName: "ręcznik duży", price: 2.28, productId: 10763553 },
        { productName: "ręcznik mały", price: 1.97, productId: 10763554 },
        { productName: "stopka", price: 1.97, productId: 10763592 },
        { productName: "podkład", price: 5.32, productId: 10763594 },
        { productName: "zasłona", price: 14.44, productId: 10763604 },
        { productName: "koc", price: 15.66, productId: 10763610 },
        { productName: "narzuta", price: 9.52, productId: 10763609 },
        { productName: "obrus", price: 5.48, productId: 10763608 },
        { productName: "kołdra", price: 15.66, productId: 10763595 },
        { productName: "ścierka", price: 0.89, productId: 10763597 },
      ],
    };

    await clientDB.from("pricing").insert(
      data.products.map((item) => ({
        price: item.price,
        product: item.productId,
        customer: data.name,
      })),
    );
  };

  const closeModal = () => setOpenModal(false);

  return (
    <AuthProvider>
      <Login />
      <main className="w-full flex h-full relative">
        <Clients
          hotels={hotels}
          activeHotel={activeHotel}
          onClick={setActiveHotel}
        />

        {activeHotel && (
          <div className="ml-[300px] min-w-3/4 overflow-x-auto w-auto relative">
            <Header
              hotelName={activeHotel.name}
              activeDate={activeDate}
              onPreviousArrowClick={previousMonth}
              onNextArrowClick={nextMonth}
              onGenerateInvoiceClick={() => setOpenModal(true)}
            />

            <ReportProductsTable
              activeHotel={activeHotel}
              activeYear={activeDate.year}
              activeMonth={activeDate.month}
              paymentMethodId={selectedPaymentMethod.id}
              openModal={openModal}
              onCloseModalClick={closeModal}
            />
          </div>
        )}
      </main>
    </AuthProvider>
  );
}
