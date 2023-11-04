import { Inter } from "next/font/google";
import { useState } from "react";
import axios from "axios";
import { Client } from "@/shared/types";
import { clientDB } from "@/backend/supabase-client";
import { FileDropzone } from "@/frontend/components/file-dropzone";
import { UploadedFile } from "@/frontend/components/uploaded-file";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const parseFile = async () => {
    const { data } = await axios.get<{ clients: Client[] }>(
      `/api/clients?filename=${files[0].name}`,
    );

    return data.clients;
  };

  const sendFile = async () => {
    try {
      if (!files.length) return;

      const { data } = await clientDB.storage
        .from("laundry-files")
        .upload(`sheets/${files[0].name}`, files[0]);

      if (data?.path) {
        const clients = await parseFile();
        setClients(clients);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="font-bold text-2xl">Generator faktur</h1>

      <section className="w-[400px]">
        <FileDropzone
          onFileChange={(file) =>
            setFiles((prevState) => {
              return [file, ...prevState];
            })
          }
        />

        {files.length > 0 && (
          <ul className="w-full my-4">
            {files.map((file) => (
              <UploadedFile
                key={file.name}
                file={file}
                onRemoveClick={() => setFiles([])}
              />
            ))}
          </ul>
        )}

        <button
          onClick={sendFile}
          className="px-6 py-2.5 bg-teal-700 w-full flex items-center justify-center text-white rounded-full disabled:bg-teal-700/40"
          disabled={files.length === 0}
        >
          Prześlij plik
        </button>
      </section>

      {clients.length > 0 && (
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
      )}
    </main>
  );
}
