import { useState } from "react";
import classNames from "classnames";
import { useListPaymentMethods } from "@/frontend/api/comarch-erp/payment-methods.controller";
import { Listbox } from "@headlessui/react";
import { clientDB } from "@/backend/supabase-client";
import { useListHotels } from "@/frontend/api/laundry/hotels.controller";
import { Hotel } from "@/shared/supabase";
import { AuthProvider } from "@/frontend/Auth.context";
import { Login } from "@/frontend/components/Login";
import { ReportProductsTable } from "@/frontend/components/ReportProductsTable";
import { useLogout } from "@/frontend/api/auth.controller";
import { LeftArrowIcon } from "@/frontend/components/left-arrow.icon";
import { RightArrowIcon } from "@/frontend/components/right-arrow.icon";

const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

export default function Home() {
  const [activeHotel, setActiveHotel] = useState<Hotel | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeDate, setActiveDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { hotels } = useListHotels();
  const { paymentMethods } = useListPaymentMethods();
  const { logout } = useLogout();

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
        <nav className="w-[300px] bg-white h-full fixed">
          <ul className="w-[300px] bg-white h-full overflow-y-auto max-h-screen p-3">
            <button onClick={() => logout()}>logout</button>
            {hotels.map((hotel) => (
              <li key={hotel.id} className="w-full">
                <button
                  onClick={() => setActiveHotel(hotel)}
                  className={classNames(
                    "px-3 py-2 hover:bg-blue-100 w-full text-left capitalize rounded-lg",
                    {
                      "bg-blue-500 text-white hover:bg-blue-500":
                        activeHotel?.id === hotel.id,
                    },
                  )}
                >
                  {hotel.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {activeHotel && (
          <div className="ml-[300px] min-w-3/4 overflow-x-auto w-auto relative">
            <div className="flex h-[80px] justify-between p-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-4">
                  <button
                    onClick={previousMonth}
                    className="w-10 h-10 rounded-full bg-white flex justify-center items-center"
                  >
                    <LeftArrowIcon />
                  </button>
                  <h2 className="text-2xl">
                    {months[activeDate.month]} {activeDate.year}
                  </h2>
                  <button
                    className="w-10 h-10 rounded-full bg-white flex justify-center items-center"
                    onClick={nextMonth}
                  >
                    <RightArrowIcon />
                  </button>
                </div>
                <p>NIP: {activeHotel.customer.nip}</p>
              </div>

              <div className="flex items-center gap-x-4 h-auto">
                <div className="relative w-36 h-12">
                  <div className="absolute top-0 w-full">
                    <Listbox
                      value={selectedPaymentMethod}
                      onChange={(value) => setSelectedPaymentMethod(value)}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-base">
                            {selectedPaymentMethod.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
                        </Listbox.Button>
                        <Listbox.Options className="bg-white py-2 mt-1 rounded-md">
                          {paymentMethods.map((method) => (
                            <Listbox.Option
                              key={method.id}
                              value={method}
                              className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                            >
                              {method.name}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                </div>

                <button
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  onClick={() => setOpenModal(true)}
                >
                  Generuj fakturę
                </button>
              </div>
            </div>

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
