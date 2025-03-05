"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import Spinner from "../../../_components/Spinner";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { useTranslations } from "next-intl";


function NewPassword() {

  const [password, setPassword] = useState("");
  const [repetPassword, setRepetPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const language = useCurrentLang();
  const t = useTranslations("changePassword");
   const i = useTranslations("imageWords");
  const currentYear = new Date().getFullYear();
  const handleNewPassword = async (eve: React.FormEvent) => {
    eve.preventDefault();

    // Reset error message
    setError("");

    // Validate inputs
    if (!password || !repetPassword) {
      setError("يرجى ملء جميع الحقول.");
      return;
    }

    if (password !== repetPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    const code = localStorage.getItem("uniqueNumber");

    // Call the API with the password
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "password": password, "code": code })
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      // Handle success (e.g., show a success message, redirect, etc.)
      const result = await response.json();
      toast.success(result.message);
      router.push(`/${language}/login`);
    } catch (error) {
      setError("حدث خطأ أثناء تغيير كلمة المرور.");
    }
  };
  return (
    <section className="md:bg-secondColor md:p-7 sm:bg-white">
      <div className="lg:grid  lg:grid-cols-12 bg-white">
        <main className="flex items-center justify-center md:px-8 md:py-3 sm:px-12 lg:col-span-7 lg:px-6 lg:pt-12 xl:col-span-6 bg-secondColor ">
          {/* First Step */}
          <div className="max-w-xl lg:max-w-3xl bg-white p-4 rounded-2xl">
            <div className="flex justify-center items-center">
              <Image src="/logo.svg" width={80} height={80} alt="Logo" />
            </div>

            <p className="text-[#141522] text-xl mt-3">{t("massage")}</p>
            <p className="text-[#6C7278] text-sm mt-1">{t("massage2")}</p>

            <form onSubmit={handleNewPassword} className="mt-3 grid grid-cols-6 gap-6">
              {error && <p className="col-span-6 text-red-500 text-start">{error}</p>}

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-black"
                >
                  {t("massage3")}
                </label>

                <div className="relative mt-2">
                  <input
                    id="password"
                    required
                    type="password"
                    className="w-full rounded-lg p-2 pe-12 text-md px-10 border border-gray focus:outline-none"
                    placeholder="***********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span className="absolute inset-y-4 start-0 grid place-content-center px-4">
                    <Image
                      src="/icons/security.svg"
                      width={20}
                      height={20}
                      alt="user"
                    />
                  </span>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="repetpassword"
                  className="block text-sm font-semibold text-black"
                >
                  {t("massage4")}
                </label>

                <div className="relative mt-2">
                  <input
                    id="repetpassword"
                    required
                    type="password"
                    className="w-full rounded-lg p-2 pe-12 text-md px-10 border border-gray focus:outline-none"
                    placeholder="***********"
                    value={repetPassword}
                    onChange={(e) => setRepetPassword(e.target.value)}
                  />

                  <span className="absolute inset-y-4 start-0 grid place-content-center px-4">
                    <Image
                      src="/icons/security.svg"
                      width={20}
                      height={20}
                      alt="user"
                    />
                  </span>
                </div>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4 sm:col-span-6 text-center">

                {isLoading ? <Spinner /> : <button
                  type="submit"
                  className="items-center gap-2 rounded-md bg-primary border hover:border-primary hover:text-primary hover:bg-white px-5 py-2.5 text-sm font-medium text-white shadow  w-full"
                >
                  {t("massage5")}
                </button>}
              </div>
            </form>

            {/* <div className="col-span-6 sm:col-span-6 mt-9 mb-2 text-center">
              <span className="shrink-0 px-6 text-[#6C7278]">
                © 2024 All rights reserved.<a href="#" className="text-primary ">Privacy Policy</a> | <a href="#" className="text-primary ">Terms and Conditions</a>
              </span>
            </div> */}
            <div className="col-span-6 sm:col-span-6 mt-9 mb-2 text-center">
              <span className="shrink-0 px-6 text-[#6C7278]">
                {t("rightsSave")} {currentYear}
                <Link href={`/${language}/privacy-policy`} className="text-primary ">
                  {" "}
                  {t("privacyPolicy")}{" "}
                </Link>{" "}
                |{" "}
                <Link href={`/${language}/terms-and-conditions`} className="text-primary ">
                  {" "}
                  {t("termsConditions")}{" "}
                </Link>
              </span>
            </div>
          </div>

          {/* secound Step */}
          {/* <div className="max-w-xl lg:max-w-3xl bg-white py-4 px-16 rounded-lg">

                            <div className="flex justify-center items-center py-7">
                            <Image src="/logo.svg" width={80} height={80} alt="Logo" />
                        </div>
                        <div className="bg-secondColor rounded-xl pt-16 pb-16 px-32 flex justify-center items-center flex-col">
                            <div className="bg-white rounded-full flex justify-center items-center" style={{ width: '100px', height: '100px', padding: '10px' }}>
                                <Image src="/images/verify.svg" width={60} height={60} alt="Logo" />
                            </div>
                            <p className="text-2xl font-medium text-center mt-4">تم تغير كلمة المرور بنجاح</p>
                            <p className=" my-4 text-[#6C7278] text-xs">يمكنك تسجيل الدخول الان</p>
                        </div>
                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4  sm:col-span-6 text-center mt-8">
                            <Link href="/login"
                                type="submit"
                                className=" items-center gap-2 rounded-md bg-primary hover:bg-sky-700  px-5 py-2.5 text-sm font-medium text-white shadow focus:relative transition ease-in-out delay-150 w-full "
                            >
                                تسجيل دخول الان
                            </Link>
                        </div>

                        <div className="col-span-6 sm:col-span-6 mt-9 mb-2 text-center">
                            <span className="shrink-0 px-6 text-[#6C7278]">
                                © 2022 جميع الحقوق محفوظة.<a href="#" className="text-primary ">  سياسة الخصوصية </a>  |   <a href="#" className="text-primary ">   الشروط و الأحكام </a>
                            </span>
                        </div>
                    </div> */}




        </main>

        <section className="hidden md:block relative items-end  lg:col-span-5  xl:col-span-6">
          <Image
            width={800}
            height={300}
            alt="Login Banner"
            src="/images/login-banner.png"
            className="rounded-lg object-cover"
          />
          <div className="bg-primary rounded-lg pb-16">
            <div className="lg:p-16 md:p-8">
              <p className="pt-5 lg:text-2xl md:text-lg font-semibold text-white lg:px-16 md:px-5 md:leading-10 text-center">{i("paragraph")}</p>
              <p className="text-gray lg:px-16 md:px-5 mt-3 text-center" >{i("title")}</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default NewPassword
