import { useRef } from "react";

interface FileDropzoneProps {
  onFileChange: (file: File) => void;
}
export const FileDropzone = ({ onFileChange }: FileDropzoneProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const chooseFile = () => {
    if (!fileInputRef) return;
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="w-full h-[200px] mb-6 border-teal-200 border-dotted border-2 bg-teal-50 rounded-2xl flex flex-col justify-center items-center gap-y-4">
        <p>Upuść plik lub wybierz z dysku</p>
        <button
          onClick={chooseFile}
          className="px-5 py-2.5 rounded-full bg-teal-700 text-white"
        >
          Wybierz plik
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={(event) => {
          if (!event.target.files) return;
          onFileChange(event.target.files[0]);
        }}
        className="hidden"
      />
    </>
  );
};
