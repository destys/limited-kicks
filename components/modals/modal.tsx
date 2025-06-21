"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean
  onChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  contentClassNames?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  children,
  contentClassNames,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            bg-black bg-opacity-80 
            backdrop-blur-sm 
            fixed 
            inset-0
            z-[2999]
          "
        />
        <Dialog.Content
          className={twMerge(
            "fixed drop-shadow-md top-[50%] left-[50%] w-full h-full max-md:!p-3 md:h-auto md:max-w-[95vw] md:max-h-fit lg:max-w-[1196px] translate-x-[-50%] translate-y-[-50%] md:rounded-[20px] py-6 px-2 md:p-8 overflow-y-auto scrollbar-hide focus:outline-none z-[10000] bg-white",
            contentClassNames
          )}
        >
          <div className="max-lg:fixed max-md:inset-0 z-[5000] bg-white p-4 md:rounded-[20px] overflow-hidden">
            <div className="max-md:max-h-[93dvh] overflow-y-auto scrollbar-hide">
              {title && (
                <Dialog.Title className="flex justify-between items-center lg:block mb-3 lg:mb-8">
                  <div className="font-medium max-md:text-base text-center">
                    {title}
                  </div>
                  <Dialog.Close
                    asChild
                    className="lg:absolute lg:top-2 lg:right-2 z-20 cursor-pointer"
                  >
                    <Image
                      src={"/icons/Icon/Close.svg"}
                      width={36}
                      height={36}
                      alt="Close"
                      className="max-md:max-w-[24px] max-md:max-h-[24px]"
                    />
                  </Dialog.Close>
                </Dialog.Title>
              )}
              <div className="relative">{children}</div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;