import { Inter } from "next/font/google";
import { useState } from "react";
import axios from "axios";
import { Client } from "@/shared/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [clients, setClients] = useState<Client[]>([]);

  const sendFile = async () => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "data",
        JSON.stringify({
          filename: "Pralnia",
          id: "001",
        }),
      );

      const res = await axios.post<{ clients: Client[] }>(
        "/api/upload-excel-file",
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        },
      );
      setClients(res.data.clients);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>Generator faktur</h1>

      <input
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={(event) => {
          if (!event.target.files) return;
          setFile(event.target.files[0]);
        }}
      />

      <button onClick={sendFile}>Upload</button>

      <ul className="flex gap-x-10 overflow-scroll max-w-full">
        {clients.map((client) => (
          <li key={client.name}>
            <p>{client.name}</p>
            {client.products.map((product, index) => (
              <li key={index} className="flex items-center">
                <p className="w-[200px]">{product.name}</p>
                <p className="w-20">{product.amount}</p>
                <p>{product.price}zł</p>
              </li>
            ))}
          </li>
        ))}
      </ul>
    </main>
  );
}
