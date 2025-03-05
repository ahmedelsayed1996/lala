"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../../../_components/Spinner";
import { toast  } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useTranslations } from "next-intl";
import useCurrentLang from "@/app/_hooks/useCurrentLang";

function ForgetPassword() {

const t = useTranslations("changePassword");
const f = useTranslations("footer");
const i = useTranslations("imageWords");
const s = useTranslations("signIn");
const language = useCurrentLang();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const verifyMail = async (eve: React.FormEvent) => {
        eve.preventDefault();
        setIsLoading(true);
        setError("");

        if (!email) {
            setError(s("error"));
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/forget-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "email" : email }),
            });

            if (!response.ok) {
                const result = await response.json();
                setIsLoading(false);
                throw new Error(result.message);
            }

            const result = await response.json();
            setIsLoading(false);
            console.log(result);
            
            toast.success(result.message);
            router.push(`/${language}/verify-password`);
        } catch (error : any) {
            setIsLoading(false);
            setError(error.message);
        }
    }
    return (
      <section className="md:bg-secondColor md:p-7 sm:bg-white">
        <div className="lg:grid  lg:grid-cols-12 bg-white">
          <main className="flex items-center justify-center md:px-8 md:py-3 sm:px-12 lg:col-span-7 lg:px-6 lg:pt-12 xl:col-span-6 bg-secondColor ">
            <div className="max-w-xl lg:max-w-3xl bg-white p-4 rounded-2xl">
              <div className="flex justify-center items-center">
                <Image src="/logo.svg" width={80} height={80} alt="Logo" />
              </div>

              <p className="text-[#141522] text-xl mt-3"> {t("massage")} </p>
              <p className="text-[#6C7278] text-sm mt-1">{t("label")}</p>

              <form
                onSubmit={verifyMail}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                {error && (
                  <p className="col-span-6 text-red-500 text-start">{error}</p>
                )}
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-black"
                  >
                    {t("email")}
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="email"
                      name="email"
                      
                      type="email"
                      className="w-full rounded-lg  p-2 pe-12 text-md px-10 border border-gray focus:outline-none"
                      placeholder="example@ex.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <span className="absolute inset-y-4 start-0 grid place-content-center px-4">
                      <Image
                        src="/icons/message.svg"
                        width={20}
                        height={20}
                        alt="user"
                      />
                    </span>
                  </div>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4  sm:col-span-6 text-center">
                  {/* <button
                                    type="submit"
                                    className=" items-center gap-2 rounded-md bg-primary hover:bg-sky-700  px-5 py-2.5 text-sm font-medium text-white shadow focus:relative transition ease-in-out delay-150 w-full "
                                >
                                    ارسل الكود
                                </button> */}
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <button
                      type="submit"
                      className=" items-center gap-2 rounded-md bg-primary hover:bg-sky-700  px-5 py-2.5 text-sm font-medium text-white shadow focus:relative transition ease-in-out delay-150 w-full "
                    >
                      {t("button")}
                    </button>
                  )}
                </div>
              </form>

              <div className="col-span-6 sm:col-span-6 mt-9 mb-2 text-center">
                <span className="shrink-0 px-6 text-[#6C7278]">
                  {f("rightsSave")}
                  <a href="#" className="text-primary ">
                    {" "}
                    {f("privacyPolicy")}{" "}
                  </a>{" "}
                  |{" "}
                  <a href="#" className="text-primary ">
                    {" "}
                    {f("termsConditions")}{" "}
                  </a>
                </span>
              </div>
            </div>
          </main>

          <section className="hidden md:block relative items-end  lg:col-span-5  xl:col-span-6">
            <Image
              width={800}
              height={300}
              alt="Login Banner"
              src="/images/login-banner.png"
              className="md:rounded-lg object-cover"
            />
            <div className="bg-primary md:rounded-lg  pb-16">
              <div className="lg:p-16 md:p-8">
                <p className="lg:text-2xl pt-4 md:text-lg font-semibold text-white lg:px-16 md:px-5 md:leading-10 text-center">
                  {i("paragraph")}
                </p>
                <p className="text-gray lg:px-16 md:px-5 mt-3 text-center">
                  {i("title")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    );
}

export default ForgetPassword
