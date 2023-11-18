import { SpreadsheetIcon } from "@/frontend/icons/spreadsheet.icon";
import { CancelIcon } from "@/frontend/icons/cancel.icon";

interface UploadedFileProps {
  file: File;
  onRemoveClick: () => void;
}
export const UploadedFile = ({ file, onRemoveClick }: UploadedFileProps) => {
  return (
    <li className="p-4 border-2 border-gray-100 rounded-xl w-full flex justify-between items-center bg-white">
      <div className="flex items-center gap-x-2">
        <div className="w-10 h-10 rounded-md flex justify-center items-center bg-green-200">
          <SpreadsheetIcon className="text-2xl text-green-600" />
        </div>
        <p>{file.name}</p>
      </div>

      <button
        className="w-8 h-8 flex justify-center items-center bg-red-50 rounded-md"
        onClick={onRemoveClick}
      >
        <CancelIcon className="text-red-600 text-xl" />
      </button>
    </li>
  );
};
