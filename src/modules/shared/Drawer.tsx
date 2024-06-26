import {
  Drawer as DrawerWrapper,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import type { PropsWithChildren, ReactElement } from "react";
import { CancelIcon } from "@/modules/shared/icons/cancel.icon";

interface DrawerProps {
  open: boolean;
  title: string;
  trigger: ReactElement;
  footer: ReactElement;
  toggleOpen: (opened: boolean) => void;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export const Drawer = ({
  open,
  trigger,
  title,
  footer,
  children,
  toggleOpen,
  hideHeader = false,
  hideFooter = false,
}: PropsWithChildren<DrawerProps>) => {
  return (
    <DrawerWrapper open={open} onOpenChange={toggleOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent>
        {!hideHeader && (
          <DrawerHeader className="flex justify-between items-center w-full px-5">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerClose onClick={() => toggleOpen(false)}>
              <button className="w-9 h-9 rounded-full bg-palette-gray-100 flex justify-center items-center">
                <CancelIcon className="text-2xl" />
              </button>
            </DrawerClose>
          </DrawerHeader>
        )}

        {children}
        {!hideFooter && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </DrawerWrapper>
  );
};
