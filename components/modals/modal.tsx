"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean
  onChange: (open:boolean) => void;
  title?: string;
  children: React.ReactNode;
  contentClassNames?:string;
}

const Modal:React.FC<ModalProps> = ({
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
            "fixed drop-shadow-md top-[50%] left-[50%] w-full h-full max-h-full md:h-auto md:max-w-[95vw] md:max-h-[92vh] lg:max-w-[1196px] translate-x-[-50%] translate-y-[-50%] md:rounded-[20px] py-6 px-2 md:p-8 overflow-y-auto scrollbar-hide focus:outline-none z-[3000] bg-white",
            contentClassNames
          )}
        >
          {title && (
            <Dialog.Title className="flex justify-between items-center lg:block relative mb-8">
              <div className="font-medium max-md:text-base text-center">
                {title}
              </div>
              <Dialog.Close
                asChild
                className="lg:absolute lg:-top-2 lg:-right-2 cursor-pointer"
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

          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;