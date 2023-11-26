import { useState } from "react";
import { Client } from "@/shared/types";
import { useListProducts } from "@/frontend/api/erp-products.controller";
import { useListPaymentMethods } from "@/frontend/api/comarch-erp/payment-methods.controller";
import axios from "axios";
import { clientDB } from "@/backend/supabase-client";
import { STORAGE_KEY } from "@/shared/storage";
import { FileDropzone } from "@/frontend/components/file-dropzone";
import { UploadedFile } from "@/frontend/components/uploaded-file";
import { ClientListItem } from "@/frontend/components/client-list-item";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [generatedInvoices, setGeneratedInvoices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { products } = useListProducts();
  const { paymentMethods } = useListPaymentMethods();

  const parseFile = async () => {
    const { data } = await axios.get<{ clients: Client[] }>(
      `/api/clients?filename=${files[0].name}`,
    );

    return data.clients;
  };

  const sendFile = async () => {
    try {
      if (!files.length) return;
      setLoading(true);

      const { error } = await clientDB.storage
        .from(STORAGE_KEY)
        .remove([`sheets/${files[0].name}`]);

      if (!error) {
        const { data } = await clientDB.storage
          .from(STORAGE_KEY)
          .upload(`sheets/${files[0].name}`, files[0]);

        if (data?.path) {
          const clients = await parseFile();
          setClients(clients);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
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
                onRemoveClick={() => {
                  setFiles([]);
                  setClients([]);
                }}
              />
            ))}
          </ul>
        )}

        {clients.length === 0 && (
          <button
            onClick={sendFile}
            className="px-6 py-2.5 bg-teal-700 w-full flex items-center justify-center text-white rounded-full disabled:bg-teal-700/40 cursor-pointer"
            disabled={files.length === 0 || loading}
          >
            {loading ? "Przesyłanie..." : "Prześlij plik"}
          </button>
        )}
      </section>
    </main>
  );
};
