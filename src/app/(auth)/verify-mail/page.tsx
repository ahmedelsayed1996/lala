'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import Spinner from "../../../_components/Spinner";
import { toast } from 'react-toastify';
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { useTranslations } from "next-intl";
import ResendEmailOtp from "@/app/_components/ResendEmailOtp";



function VerifyMail() {

    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const language = useCurrentLang();
    const t = useTranslations("changePassword");
    const i = useTranslations("imageWords");
    const currentYear = new Date().getFullYear();
    const [resendCode, setResendCode] = useState<boolean>(false);
    const handleChange = (index: number, value: string) => {
        if (value.match(/^[0-9]*$/)) {
            const newOtp = [...otp];
            if (value.length > 1) {
                const pastedValues = value.split('');
                for (let i = 0; i < pastedValues.length; i++) {
                    if (index + i < newOtp.length) {
                        newOtp[index + i] = pastedValues[i];
                    }
                }
            } else {
                newOtp[index] = value;
            }
            setOtp(newOtp);
        }
    };

    const verifyOtp = async (eve: React.FormEvent) => {
        eve.preventDefault();
        const otpCode = otp.join("");
        console.log(otpCode);
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/validate-email-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "code": otpCode }),
            });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message);
            }
            const result = await response.json();
            router.push(`/${language}/login`);
            console.log(result)
            setIsLoading(false);
            toast.success(result.message);
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
            console.log(error.message);
        }
    };

    const handleResendCode = () => {
        console.log("write mail Success");
        setResendCode(false);
    }

    return (
        <section className="md:bg-secondColor md:p-7 sm:bg-white">
            {resendCode ? <ResendEmailOtp resendCodeAgain={handleResendCode} /> :
                <div className="lg:grid  lg:grid-cols-12 bg-white">
                    <main className="flex items-center justify-center md:px-8 md:py-3 sm:px-12 lg:col-span-7 lg:px-6 lg:pt-12 xl:col-span-6 bg-secondColor ">
                        <div className="max-w-xl lg:max-w-3xl bg-white p-4 rounded-2xl">
                            <div className="flex justify-center items-center">
                                <Image src="/logo.svg" width={80} height={80} alt="Logo" />
                            </div>

                            <p className="text-[#6C7278] text-sm mt-32">{t("massage6")} <span className="text-red-400">{t("massage7")}</span></p>

                            <form onSubmit={verifyOtp} className="mt-8 grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-6">
                                    {error && <p className="col-span-6 text-red-500 text-start">{error}</p>}
                                    <div className="flex gap-4 items-center">
                                        {otp.map((digit, index) => (
                                            <input
                                                required
                                                key={index}
                                                type="text"
                                                maxLength={1}
                                                className="border border-gray rounded-md w-10 p-2 text-center focus:outline-none"
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onPaste={(e) => handleChange(index, e.clipboardData.getData('Text'))}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[#6C7278] text-sm mt-1">
                                        {t("massage8")}
                                        <span className="text-red-400 cursor-pointer"
                                            onClick={() => setResendCode(true)}>
                                            {t("massage9")}
                                        </span>
                                    </p>
                                </div>
                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4 sm:col-span-6 text-center">
                                    {isLoading ? <Spinner /> : <button
                                        type="submit"
                                        className="items-center gap-2 rounded-md bg-primary border hover:border-primary hover:text-primary hover:bg-white px-5 py-2.5 text-sm font-medium text-white shadow  w-full"
                                    >
                                        {t("submit")}
                                    </button>}
                                </div>
                            </form>

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




                    </main>

                    <section className="hidden md:block relative items-end  lg:col-span-5  xl:col-span-6">
                        <Image
                            width={800}
                            height={300}
                            alt="Login Banner"
                            src="/images/login-banner.png"
                            className="md:rounded-lg object-cover"
                        />
                        <div className="bg-primary md:rounded-lg pb-16">
                            <div className="lg:p-10 md:p-8">
                                <p className="pt-5 lg:text-2xl md:text-lg font-semibold text-white  md:px-5 md:leading-10 text-center">
                                    {i("paragraph")}
                                </p>
                                <p className="text-gray  md:px-5 mt-3 text-center">
                                    {i("title")}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>}
        </section>
    )
}

export default VerifyMail
