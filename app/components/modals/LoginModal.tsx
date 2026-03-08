"use client";

import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";

type FormData = {
  email: string;
  password: string;
};

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Logged in successfully!");
        router.refresh();
        loginModal.onClose();
      } else {
        toast.error(result?.error || "Invalid email or password.");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  });

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  if (!loginModal.isOpen) return null;

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full sm:w-11/12 md:w-4/6 lg:w-3/6 xl:w-2/5 my-2 sm:my-4 md:my-6 mx-auto h-full lg:h-auto md:h-auto max-h-[95vh]">
        <div className="translate duration-300 h-full translate-y-0 opacity-100">
          <div className="h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none max-h-[95vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center p-4 sm:p-6 rounded-t justify-center relative border-b-[1px] border-gray-200 dark:border-gray-700">
              <button
                onClick={loginModal.onClose}
                className="p-1 border-0 hover:opacity-70 transition absolute right-4 sm:right-6 text-gray-500 dark:text-gray-400"
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Welcome Back
              </div>
            </div>

            {/* Body */}
            <div className="relative p-4 sm:p-6 flex-auto">
              <div className="flex flex-col gap-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to 4Rent</h2>
                  <p className="text-gray-600 dark:text-gray-400">Log in to your account to continue</p>
                </div>

                <form id="login-form" onSubmit={onSubmit} className="flex flex-col gap-4">
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      disabled={isLoading}
                      placeholder="Enter your email"
                      className={`w-full p-3 sm:p-4 font-light bg-white dark:bg-gray-700 border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base text-gray-900 dark:text-white pl-3 sm:pl-4 ${
                        errors.email ? "border-rose-500" : "border-neutral-300 dark:border-gray-600"
                      } focus:border-neutral-800 dark:focus:border-gray-400`}
                    />
                    {errors.email && (
                      <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password", { required: "Password is required" })}
                      disabled={isLoading}
                      placeholder="Enter your password"
                      className={`w-full p-3 sm:p-4 font-light bg-white dark:bg-gray-700 border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base text-gray-900 dark:text-white pl-3 sm:pl-4 ${
                        errors.password ? "border-rose-500" : "border-neutral-300 dark:border-gray-600"
                      } focus:border-neutral-800 dark:focus:border-gray-400`}
                    />
                    {errors.password && (
                      <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="flex flex-col gap-2 p-4 sm:p-6">
              <button
                type="submit"
                form="login-form"
                disabled={isLoading}
                className="w-full py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-md font-semibold rounded-lg sm:rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>

              <hr className="my-2" />

              <button
                type="button"
                onClick={() => signIn("google")}
                disabled={isLoading}
                className="w-full py-2 sm:py-3 px-4 flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:border-purple-500 hover:text-purple-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>

              <div className="text-center mt-2">
                <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
                <button
                  type="button"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium"
                  onClick={onToggle}
                >
                  Sign up for 4Rent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginModal;
