"use client";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import { IoMdSend } from "@react-icons/all-files/io/IoMdSend";

import { MdCancel } from "@react-icons/all-files/md/MdCancel";
import Button from "../Button";

interface ModalProps {
   isOpen?: boolean;
   onClose: () => void;
   onSubmit: () => void;
   title?: string;
   body?: React.ReactElement;
   footer?: React.ReactElement;
   actionLabel: string;
   disabled?: boolean;
   secondaryAction?: () => void;
   secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
   isOpen,
   onClose,
   onSubmit,
   title,
   body,
   footer,
   actionLabel,
   disabled,
   secondaryAction,
   secondaryActionLabel,
}) => {
   const [showModal, setShowModal] = useState(isOpen);

   useEffect(() => {
      setShowModal(isOpen);

      return () => {};
   }, [isOpen]);

   const handleClose = useCallback(() => {
      if (disabled) {
         return;
      }

      setShowModal(false);
      setTimeout(() => {
         onClose();
      }, 300);
   }, [disabled, onClose]);

   const handleSubmit = useCallback(() => {
      if (disabled) {
         return;
      }

      onSubmit();
   }, [disabled, onSubmit]);

   const handleSecondayAction = useCallback(() => {
      if (disabled || !secondaryAction) {
         return;
      }

      secondaryAction();
   }, [disabled, secondaryAction]);

   if (!isOpen) {
      return null;
   }

   return (
      <>
         <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
            <div className="relative w-full sm:w-11/12 md:w-4/6 lg:w-3/6 xl:w-2/5 my-2 sm:my-4 md:my-6 mx-auto h-full lg:h-auto md:h-auto max-h-[95vh]">
               {/* CONTENT */}
               <div
                  className={`translate duration-300 h-full 
                  ${showModal ? "translate-y-0" : "translate-y-full"}
                  ${showModal ? "opacity-100" : "opacity-0"}`}
               >
                  <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg realtive flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none max-h-[95vh] overflow-y-auto">
                     {/* HEADER */}
                     <div className="flex items-center p-4 sm:p-6 rounded-t justify-center relative border-b-[1px] border-gray-200 dark:border-gray-700">
                        <button
                           onClick={handleClose}
                           className="p-1 border-0 hover:opacity-70 transition absolute right-4 sm:right-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                           <IoMdClose size={16} className="sm:hidden" />
                           <IoMdClose size={18} className="hidden sm:block" />
                        </button>
                        <div className="text-base sm:text-lg font font-semibold text-gray-900 dark:text-white">{title}</div>
                     </div>
                     {/* BODY */}
                     <div className="relative p-4 sm:p-6 flex-auto">{body}</div>
                     {/* FOOTER */}
                     <div className="flex flex-col gap-2 p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
                           {secondaryAction && secondaryActionLabel && (
                              <Button
                                 outline
                                 disabled={disabled}
                                 label={secondaryActionLabel}
                                 onClick={handleSecondayAction}
                              />
                           )}

                           <Button disabled={disabled} label={actionLabel} onClick={handleSubmit} />
                        </div>
                        {footer}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
export default Modal;
