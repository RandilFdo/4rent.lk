"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { FcGoogle } from "react-icons/fc";

const RegisterModal = () => {
   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      axios
         .post("/api/register", data)
         .then(() => {
            // Automatically log in the user after successful registration
            signIn("credentials", {
               email: data.email,
               password: data.password,
               redirect: false,
            }).then((callback) => {
               if (callback?.ok) {
                  registerModal.onClose();
                  toast.success("Successfully registered and logged in!");
                  window.location.reload();
               } else {
                  registerModal.onClose();
                  loginModal.onOpen();
                  toast.success("Successfully registered! Please log in.");
               }
            });
         })
         .catch(() => {
            toast.error("Something Went Wrong");
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   const onToggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen();
   }, [loginModal, registerModal]);

   const bodyContent = (
      <div className="flex flex-col gap-4">
         <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Join 4Rent</h2>
            <p className="text-gray-600 dark:text-gray-400">Create your account to start renting</p>
         </div>
         <Input
            id="name"
            label="Full Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
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
      <div className="flex flex-col gap-4 mt-2">
         <hr />
         <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn("google")}
         />
         <div className="text-center mt-2">
            <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
            <button
               className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium"
               onClick={onToggle}
               type="button"
            >
               Log in
            </button>
         </div>
      </div>
   );

   return (
      <Modal
         disabled={isLoading}
         isOpen={registerModal.isOpen}
         title=""
         actionLabel="Create Account"
         onClose={registerModal.onClose}
         onSubmit={handleSubmit(onSubmit)}
         body={bodyContent}
         footer={footerContent}
      />
   );
};
export default RegisterModal;
