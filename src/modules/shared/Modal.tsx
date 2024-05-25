import { Dialog } from "@headlessui/react";
import { CancelIcon } from "@/modules/shared/icons/cancel.icon";
import { PropsWithChildren } from "react";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
}
export const Modal = ({
  title,
  open,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  return (
    <Dialog open={open} onClose={onClose} className="z-50 bg-gray-800">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 p-4 text-white z-20">
        <Dialog.Overlay />

        <Dialog.Panel className="min-w-[450px] bg-white rounded-2xl text-black p-4">
          <div className="w-full flex justify-between mb-3">
            <Dialog.Title className="font-semibold text-xl">
              {title}
            </Dialog.Title>
            <button onClick={onClose}>
              <CancelIcon className="text-3xl" />
            </button>
          </div>

          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
