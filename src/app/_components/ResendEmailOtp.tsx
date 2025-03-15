// import { useTranslations } from "next-intl";
// import useCurrentLang from "../_hooks/useCurrentLang";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import ButtonFill from "./ButtonFill";
import CopyRights from "./CopyRights";


interface SendCode {
    resendCodeAgain: () => void;
}

function ResendEmailOtp({ resendCodeAgain }: SendCode) {

    // const t = useTranslations("changePassword");
    // const f = useTranslations("footer");
    // const i = useTranslations("imageWords");
    // const s = useTranslations("signIn");
    // const language = useCurrentLang();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const verifyMail = async (eve: React.FormEvent) => {
        eve.preventDefault();
        setIsLoading(true);
        setError("");

        if (!email) {
            // setError(s("error"));
            setIsLoading(false);
            return;
        }
        // console.log("email//", email);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/resend-email-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Accept-Language": language,
                },
                body: JSON.stringify({ "email": email }),
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
            resendCodeAgain();
            // router.push(`/${language}/verify-mail`);
        } catch (error: any) {
            setIsLoading(false);
            setError(error.message);
        }
    }





    return (
        <main className="flex items-center justify-center md:px-8 md:py-3 sm:px-12 lg:col-span-7 lg:px-6 lg:pt-12 xl:col-span-6 bg-secondColor ">
            <div className="max-w-xl lg:max-w-3xl bg-white p-4 rounded-2xl ">
                <div className="flex justify-center items-center">
                    <Image src="/logo.svg" width={80} height={80} alt="Logo" />
                </div>

                <p className="text-[#141522] text-xl mt-3">
                     {/* {t("resendCode")} */}resendCode
                      </p>
                <p className="text-[#6C7278] text-sm mt-1">
                    {/* {t("resendCode2")} */}resendCode2
                    </p>

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
                            {/* {t("email")} */}Email Address
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
                            <ButtonFill title="Submit"/>
                        )}
                    </div>
                </form>

                <CopyRights />
            </div>
        </main>
    )
}

export default ResendEmailOtp;