"use client";

import { signIn } from "next-auth/react";
// import axios from "axios";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
   const router = useRouter();
   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      signIn("credentials", {
         ...data,
         redirect: false,
      }).then((callback) => {
         setIsLoading(false);

         if (callback?.ok) {
            toast.success("Logged in");
            router.refresh();
            loginModal.onClose();
         }

         if (callback?.error) {
            toast.error(callback.error);
         }
      });
   };

   const onToggle = useCallback(() => {
      loginModal.onClose();
      registerModal.onOpen();
   }, [loginModal, registerModal]);

   const bodyContent = (
      <div className="flex flex-col gap-4">
         <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to 4Rent</h2>
            <p className="text-gray-600 dark:text-gray-400">Log in to your account to continue</p>
         </div>
         <Input
            id="email"
            label="Email Address"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
         <Input
            id="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="password"
         />
      </div>
   );

   const footerContent = (
      <div className="flex flex-col gap-4 mt-6">
         <div className="relative">
            <div className="absolute inset-0 flex items-center">
               <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
               <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
         </div>
         <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn("google")}
         />
         <div className="text-center mt-4">
            <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
            <button
               className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium"
               onClick={onToggle}
            >
               Sign up for 4Rent
            </button>
         </div>
      </div>
   );

   return (
      <Modal
         disabled={isLoading}
         isOpen={loginModal.isOpen}
         title=""
         actionLabel="Log In"
         onClose={loginModal.onClose}
         onSubmit={handleSubmit(onSubmit)}
         body={bodyContent}
         footer={footerContent}
      />
   );
};
export default LoginModal;
