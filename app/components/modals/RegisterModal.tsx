"use client";
import axios from "axios";
import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
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
            registerModal.onClose();
            loginModal.onOpen();
            toast.success("Successfully registered");
         })
         .catch((error) => {
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join 4Rent</h2>
            <p className="text-gray-600">Create your account to start renting</p>
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
      <div className="flex flex-col gap-4 mt-6">
         <div className="relative">
            <div className="absolute inset-0 flex items-center">
               <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
               <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
         </div>
         <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn("google")}
         />
         <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => signIn("github")}
         />
         <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <button
               className="text-blue-600 hover:text-blue-500 font-medium"
               onClick={onToggle}
            >
               Sign in
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
