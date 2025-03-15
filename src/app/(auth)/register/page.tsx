"use client"
import React, { useState } from "react";
import Image from "next/image";
// import Button from "@/app/_components/Button";
import Link from "next/link";
// import Spinner from "../../../_components/Spinner";
import { toast } from 'react-toastify';
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import CopyRights from "@/app/_components/CopyRights";
import Spinner from "@/app/_components/Spinner";
import ButtonFill from "@/app/_components/ButtonFill";
// import { useTranslations } from "next-intl";
// import useCurrentLang from "@/app/_hooks/useCurrentLang";



function Register() {
  // const t = useTranslations("createAccount");
  // const i = useTranslations("imageWords");
  // const f = useTranslations("footer");
  // const m = useTranslations("emptyField");
  // const language = useCurrentLang();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [stepActive, setStepActive] = useState<number>(1);
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    number: "",
    email: "",
    password: "",
    repetpassword: "",
    persona: "",
  });


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrors({
      ...errors,
      [name]: value ? "" : `this Field   ${name}   is Requeire`,
    });
    console.log(name, value);

  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({
      fname: "",
      lname: "",
      number: "",
      email: "",
      password: "",
      repetpassword: "",
      persona: "",
    });

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const fname = formData.get("fname") as string;
    const lname = formData.get("lname") as string;
    const number = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repetpassword = formData.get("repetpassword") as string;
    const persona = formData.get("persona") as string;



    let hasError = false;
    const newErrors = { ...errors };

    if (!fname) {
      newErrors.fname = `First name required`;
      hasError = true;
    }

    if (!lname) {
      newErrors.lname = `Last name required`;
      hasError = true;
    }

    if (!email) {
      newErrors.email = `Email required`;
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = `Email is invalid`;
      hasError = true;
    }

    if (!password) {
      newErrors.password = `Password is required`;
      hasError = true;
    }

    if (!repetpassword) {
      newErrors.repetpassword = `Password confirmation is required`;
      hasError = true;
    } else if (repetpassword !== password) {
      newErrors.repetpassword = `Passwords do not match`;
      hasError = true;
    }

    if (!persona) {
      newErrors.persona = `Must Choose One Persona`;
      hasError = true;
    }

    setErrors(newErrors);
    if (!hasError) {
      // console.log(fname, lname, number, email, password, repetpassword);
      setIsLoading(true);
      setStepActive(2);

      // try {
      //   const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/register`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(
      //       {
      //         "first_name": fname,
      //         "last_name": lname,
      //         "phone_number": number,
      //         "email": email,
      //         "password": password
      //       }
      //     ),
      //   });
      //   if (!response.ok) {
      //     const result = await response.json();
      //     console.log(result.message);
      //     throw new Error(result.message);
      //   }

      //   const result = await response.json();

      //   // console.log("Verify Mail Address", result);
      //   setIsVerify(true);
      //   toast.info('🦄 Verify Mail Address!', {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     // transition: Bounce ,
      //   });
      // } catch (error: any) {
      //   console.log(error.message);
      //   toast.error(error.message);
      // } finally {
      //   setIsLoading(false);
      // }

    }
  };

  const initiateGoogleLogin = () => {
    // window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/google`;
  };
  const initiateFacebookLogin = () => {
    // window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/facebook`;
  };


  return (
    <section className="md:bg-secondColor  md:p-7 sm:bg-white">
      <div className="">
        <main className="flex gap-3">
          <ol className="justify-center items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
            <li className={`flex items-center ${stepActive === 1 ? "text-primary" : "text-gray-500"}  dark:text-blue-500 space-x-2.5 rtl:space-x-reverse cursor-pointer`}>
              <span className={`flex items-center justify-center w-8 h-8 border ${stepActive === 1 ? "border-primary" : "border-gray-500"}  rounded-full shrink-0 dark:border-blue-500`}>
                1
              </span>
              <span>
                <h3 className="font-medium leading-tight">User info</h3>
                <p className="text-sm">Step details here</p>
              </span>
            </li>
            <li className={`flex items-center ${stepActive === 2 ? "text-primary" : "text-gray-500"}   dark:text-gray-400 space-x-2.5 rtl:space-x-reverse cursor-pointer`}>
              <span className={`flex items-center justify-center w-8 h-8 border ${stepActive === 2 ? "border-primary" : "border-gray-500"}  rounded-full shrink-0 dark:border-blue-500`}>
                2
              </span>
              <span>
                <h3 className="font-medium leading-tight">Company info</h3>
                <p className="text-sm">Step details here</p>
              </span>
            </li>
            <li className={`flex items-center ${stepActive === 3 ? "text-primary" : "text-gray-500"}  dark:text-gray-400 space-x-2.5 rtl:space-x-reverse cursor-pointer`}>
              <span className={`flex items-center justify-center w-8 h-8 border ${stepActive === 3 ? "border-primary" : "border-gray-500"}  rounded-full shrink-0 dark:border-blue-500`}>
                3
              </span>
              <span>
                <h3 className="font-medium leading-tight">Payment info</h3>
                <p className="text-sm">Step details here</p>
              </span>
            </li>
          </ol>
        </main>
        <main className="flex items-center justify-center px-2 md:px-8 py-3 sm:px-12 lg:col-span-7 lg:px-6 lg:pt-12 xl:col-span-6 bg-secondColor">
          <div className="">
            {/* <div className="flex justify-center items-center py-3">
              <Image src="/large.png" width={180} height={180} alt="Logo" />
            </div> */}
            <h2 className="font-black text-4xl py-5">Let's create your account</h2>
            <p></p>
            <form
              onSubmit={handleRegister}
              className=""
            >
              <div className="flex w-full gap-2">
                <div>
                  <label id="personaOne" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl cursor-pointer hover:bg-gray-100 focus-within:border-primary focus-within:border-2 ">
                    <div className="max-w-sm p-6 bg-white rounded-lg shadow-sm flex flex-col justify-center items-center dark:bg-gray-800 dark:border-gray-700">
                      <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                      </svg>
                      <a href="#">
                        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">3k Individuals 29.99$/30 Days</h5>
                      </a>
                      <ul>
                        <li>1 User</li>
                        <li>10 Social Account</li>
                        <li>Not Support</li>
                      </ul>
                    </div>
                    <input type="radio" name="persona" id="personaOne" value="personaOne" onChange={handleInputChange} />
                  </label>
                  {errors.persona && (
                    <p className="text-red-500 text-sm ms-5"><i className="fa-solid fa-circle-exclamation"></i>{" "}{errors.persona} </p>
                  )}
                </div>
                <div>
                  <label id="personaTwo" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl cursor-pointer hover:bg-gray-100 focus-within:border-primary focus-within:border-2 ">
                    <div className="max-w-sm p-6 bg-white rounded-lg shadow-sm flex flex-col justify-center items-center dark:bg-gray-800 dark:border-gray-700">
                      <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                      </svg>
                      <a href="#">
                        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">3k Individuals 29.99$/30 Days</h5>
                      </a>
                      <ul>
                        <li>1 User</li>
                        <li>10 Social Account</li>
                        <li>Not Support</li>
                      </ul>
                    </div>
                    <input type="radio" name="persona" id="personaTwo" value="personaTwo" onChange={handleInputChange} />
                  </label>
                  {/* {errors.persona && (
                    <p className="text-red-500 text-sm ms-5">{errors.persona}</p>
                  )} */}
                </div>
                <div>
                  <label id="personaThree" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl cursor-pointer hover:bg-gray-100 focus-within:border-primary focus-within:border-2 ">
                    <div className="max-w-sm p-6 bg-white rounded-lg shadow-sm flex flex-col justify-center items-center dark:bg-gray-800 dark:border-gray-700">
                      <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                      </svg>
                      <a href="#">
                        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">3k Individuals 29.99$/30 Days</h5>
                      </a>
                      <ul>
                        <li>1 User</li>
                        <li>10 Social Account</li>
                        <li>Not Support</li>
                      </ul>
                    </div>
                    <input type="radio" name="persona" id="personaThree" value="personaThree" onChange={handleInputChange} />
                  </label>
                  {/* {errors.persona && (
                    <p className="text-red-500 text-sm ms-5">{errors.persona}</p>
                  )} */}
                </div>
                {/* <div>
                  <label id="personaTwo" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl cursor-pointer hover:bg-gray-100 focus-within:border-primary focus-within:border-2">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/large.png" alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Package Two</h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </div>
                    <input type="radio" name="persona" id="personaTwo" value="personaTwo" required onChange={handleInputChange} />
                  </label>
                </div>
                <div>
                  <label id="personaThree" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl cursor-pointer hover:bg-gray-100 focus-within:border-primary focus-within:border-2">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/large.png" alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Package Three</h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </div>
                    <input type="radio" name="persona" id="personaThree" value="personaThree" required onChange={handleInputChange} />
                  </label>
                </div> */}
              </div>

              <div className="max-w-xl lg:max-w-3xl mx-auto mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-12  md:col-span-6 ">
                  <label
                    htmlFor="fname"
                    className="block text-sm font-bold text-black"
                  >
                    First Name
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="fname"
                      name="fname"
                      type="text"
                      className="w-full rounded-lg p-2  text-md  border border-gray focus:outline-none"
                      placeholder="Ahmed Elsayed"
                      onChange={handleInputChange}
                    />
                    {/* <span className="absolute inset-y-4 start-0 grid place-content-center px-4">
                      <Image
                        src="/icons/user-blue.svg"
                        width={20}
                        height={20}
                        alt="user"
                      />
                    </span> */}
                  </div>
                  {errors.fname && (
                    <p className="text-red-500 text-sm"><i className="fa-solid fa-circle-exclamation"></i>{" "}{errors.fname}</p>
                  )}
                </div>

                <div className="col-span-12  md:col-span-6 ">
                  <label
                    htmlFor="lname"
                    className="block text-sm font-semibold text-black"
                  >
                    Last Name
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="lname"
                      name="lname"
                      type="text"

                      className="w-full rounded-lg p-2 pe-12 text-md px-10 border border-gray focus:outline-none"
                      placeholder="mohamed"
                      onChange={handleInputChange}
                    />
                    <span className="absolute inset-y-4 start-0 grid place-content-center px-4">
                      <Image
                        src="/icons/user-blue.svg"
                        width={20}
                        height={20}
                        alt="user"
                      />
                    </span>
                  </div>
                  {errors.lname && (
                    <p className="text-red-500 text-sm"><i className="fa-solid fa-circle-exclamation"></i>{" "}{errors.lname}</p>
                  )}
                </div>

                {/* <div className="col-span-12  md:col-span-12">
                  <label
                    htmlFor="number"
                    className="block text-sm font-semibold text-black capitalize"
                  >
                    phone number
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full rounded-lg p-2 pe-12 text-md px-10 border border-gray focus:outline-none"
                      placeholder="example@ex.com"
                      onChange={handleInputChange}
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
                  {errors.number && (
                    <p className="text-red-500 text-sm">{errors.number}</p>
                  )}
                </div> */}

                <div className="col-span-12  md:col-span-12 ">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-black"
                  >
                    E-mail
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full rounded-lg p-2 pe-12 text-md px-10 border border-gray focus:outline-none"
                      placeholder="example@ex.com"
                      onChange={handleInputChange}
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
                  {errors.email && (
                    <p className="text-red-500 text-sm"><i className="fa-solid fa-circle-exclamation"></i>{" "}{errors.email}</p>
                  )}
                </div>

                <div className="col-span-12  md:col-span-6 ">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-black"
                  >
                    Password
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="w-full rounded-lg p-2 pe-12 text-md px-10 border border-gray focus:outline-none"
                      placeholder="***********"
                      onChange={handleInputChange}
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
                  {errors.password && (
                    <p className="text-red-500 text-sm"><i className="fa-solid fa-circle-exclamation"></i>{" "}{errors.password}</p>
                  )}
                </div>

                <div className="col-span-12  md:col-span-6 ">
                  <label
                    htmlFor="repetpassword"
                    className="block text-sm font-semibold text-black"
                  >
                    Confirm Password
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="repetpassword"
                      name="repetpassword"
                      type="password"
                      className="w-full rounded-lg p-2 pe-12 text-md px-10 border border-gray focus:outline-none"
                      placeholder="***********"
                      onChange={handleInputChange}
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
                  {errors.repetpassword && (
                    <p className="text-red-500 text-sm">
                      <i className="fa-solid fa-circle-exclamation"></i>{" "} {errors.repetpassword}
                    </p>
                  )}
                </div>

                <div className="col-span-6 sm:flex sm:items-end sm:gap-4 sm:col-span-12 text-end items-end">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <ButtonFill title="Next" />
                  )}
                </div>
              </div>
            </form>
            <div className="max-w-xl lg:max-w-3xl mx-auto col-span-6 sm:col-span-6 my-9">
              <span className="flex items-center">
                <span className="h-px flex-1 bg-black"></span>
                <span className="shrink-0 px-6 text-black">
                  Or
                </span>
                <span className="h-px flex-1 bg-black"></span>
              </span>
            </div>
            <div className="flex justify-between items-center max-w-xl lg:max-w-3xl mx-auto">
              {/* <a
                  className="flex-1  mx-2  rounded-lg shadow-md border border-gray flex justify-center md:px-12 py-3 text-sm font-medium hover:shadow-xl"
                  href="#"
                >
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_244_7720)">
                      <path d="M16.9493 0C17.0051 0 17.061 0 17.12 0C17.257 1.69253 16.611 2.95719 15.8258 3.87301C15.0555 4.78251 14.0005 5.6646 12.2943 5.53076C12.1805 3.86247 12.8276 2.69161 13.6116 1.77789C14.3388 0.92636 15.672 0.168621 16.9493 0Z" fill="black" />
                      <path d="M22.1152 17.6164C22.1152 17.6332 22.1152 17.648 22.1152 17.6638C21.6356 19.1161 20.9517 20.3607 20.117 21.5157C19.355 22.5643 18.4213 23.9755 16.7541 23.9755C15.3134 23.9755 14.3565 23.0491 12.88 23.0238C11.3182 22.9985 10.4592 23.7984 9.03124 23.9997C8.86789 23.9997 8.70454 23.9997 8.54435 23.9997C7.49574 23.848 6.64947 23.0175 6.03295 22.2693C4.21501 20.0582 2.81019 17.2022 2.54883 13.5474C2.54883 13.189 2.54883 12.8318 2.54883 12.4735C2.65949 9.85772 3.93046 7.73099 5.61983 6.7003C6.51142 6.15228 7.73708 5.68541 9.10185 5.89408C9.68675 5.98471 10.2843 6.18495 10.8081 6.38308C11.3045 6.57383 11.9252 6.91213 12.5133 6.89421C12.9116 6.88262 13.3079 6.67501 13.7094 6.52852C14.8855 6.1038 16.0385 5.61691 17.5582 5.8456C19.3846 6.12172 20.6808 6.93321 21.4818 8.18521C19.9368 9.16848 18.7153 10.6502 18.924 13.1806C19.1095 15.4791 20.4458 16.8239 22.1152 17.6164Z" fill="black" />
                    </g>
                    <defs>
                      <clipPath id="clip0_244_7720">
                        <rect width="24" height="24" fill="white" transform="translate(0.332031)" />
                      </clipPath>
                    </defs>
                  </svg>

                </a>
                <button
                  className="flex-1  mx-2 rounded-lg shadow-md border border-gray flex justify-center md:px-12 py-3 text-sm font-medium hover:shadow-xl"
                  onClick={initiateFacebookLogin}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_244_7715)">
                      <path d="M10.02 23.88C4.32 22.86 0 17.94 0 12C0 5.4 5.4 0 12 0C18.6 0 24 5.4 24 12C24 17.94 19.68 22.86 13.98 23.88L13.32 23.34H10.68L10.02 23.88Z" fill="url(#paint0_linear_244_7715)" />
                      <path d="M16.6801 15.3597L17.2201 11.9997H14.0401V9.65969C14.0401 8.69969 14.4001 7.97969 15.8401 7.97969H17.4001V4.91969C16.5601 4.79969 15.6001 4.67969 14.7601 4.67969C12.0001 4.67969 10.0801 6.35969 10.0801 9.35969V11.9997H7.08008V15.3597H10.0801V23.8197C10.7401 23.9397 11.4001 23.9997 12.0601 23.9997C12.7201 23.9997 13.3801 23.9397 14.0401 23.8197V15.3597H16.6801Z" fill="white" />
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_244_7715" x1="12.0006" y1="23.1654" x2="12.0006" y2="-0.00442066" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#0062E0" />
                        <stop offset="1" stop-color="#19AFFF" />
                      </linearGradient>
                      <clipPath id="clip0_244_7715">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                </button> */}
              <button className="flex-1  mx-2 rounded-lg shadow-md border border-gray flex justify-center md:px-12 py-3 text-sm font-medium hover:shadow-xl">
                <Image src="https://i.hootsuite.com/assets/product-growth/paid-signup/icons/facebook.svg" width={50} height={50} alt="FB" />
              </button>
              <button className="flex-1  mx-2 rounded-lg shadow-md border border-gray flex justify-center md:px-12 py-3 text-sm font-medium hover:shadow-xl">
                <Image src="https://i.hootsuite.com/assets/product-growth/paid-signup/icons/linkedin-round.svg" width={50} height={50} alt="FB" />
              </button>
              <button className="flex-1  mx-2 rounded-lg shadow-md border border-gray flex justify-center md:px-12 py-3 text-sm font-medium hover:shadow-xl">
                <Image src="https://i.hootsuite.com/assets/product-growth/paid-signup/icons/x.svg" width={50} height={50} alt="FB" />
              </button>
              <button className="flex-1  mx-2 rounded-lg shadow-md border border-gray flex justify-center md:px-12 py-3 text-sm font-medium hover:shadow-xl">
                <Image src="https://i.hootsuite.com/assets/product-growth/paid-signup/icons/google.svg" width={50} height={50} alt="FB" />
              </button>
              {/* <button
                onClick={initiateGoogleLogin}
                className="flex-1  mx-2  rounded-lg shadow-md border border-gray flex justify-center md:px-12 py-3 text-sm font-medium hover:shadow-xl"
              >
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.1666 12.2326C23.1666 11.3693 23.0951 10.7393 22.9404 10.0859H12.8809V13.9826H18.7856C18.6666 14.9509 18.0237 16.4093 16.5951 17.3892L16.5751 17.5197L19.7557 19.9344L19.9761 19.9559C21.9999 18.1242 23.1666 15.4292 23.1666 12.2326Z" fill="#4285F4" />
                  <path d="M12.88 22.4996C15.7728 22.4996 18.2014 21.5662 19.9752 19.9562L16.5943 17.3895C15.6895 18.0078 14.4752 18.4395 12.88 18.4395C10.0467 18.4395 7.64197 16.6079 6.78475 14.0762L6.6591 14.0866L3.35184 16.595L3.30859 16.7128C5.07047 20.1428 8.68952 22.4996 12.88 22.4996Z" fill="#34A853" />
                  <path d="M6.78697 14.0775C6.56078 13.4241 6.42988 12.7241 6.42988 12.0008C6.42988 11.2774 6.56078 10.5774 6.77507 9.9241L6.76907 9.78496L3.42036 7.23633L3.3108 7.2874C2.58464 8.71075 2.16797 10.3091 2.16797 12.0008C2.16797 13.6924 2.58464 15.2907 3.3108 16.7141L6.78697 14.0775Z" fill="#FBBC05" />
                  <path d="M12.8801 5.55997C14.8919 5.55997 16.2491 6.41163 17.0229 7.12335L20.0467 4.23C18.1896 2.53834 15.7729 1.5 12.8801 1.5C8.68955 1.5 5.07048 3.85665 3.30859 7.28662L6.77287 9.92332C7.642 7.39166 10.0467 5.55997 12.8801 5.55997Z" fill="#EB4335" />
                </svg>

              </button> */}
            </div>
            <div className="col-span-6 sm:col-span-6 my-9 text-center">
              <span className="shrink-0 px-6 text-[#6C7278]">
                I already have an account{" "}
                <Link
                  href={`/login`}
                  className="text-primary "
                >
                  Login
                </Link>
                {/* <a href="#" className="text-primary ">
                    {t("Login")}
                  </a> */}
              </span>
            </div>
            {/* <CopyRights /> */}
            <div className="col-span-6 sm:col-span-6 mt-9 mb-2 text-center">
              <span className="shrink-0 px-6 text-[#6C7278]">
                By creating an account, I agree to
                <Link href={`/terms-and-conditions`} className="text-blue-950 underline">
                  {" "}
                  Terms and Conditions,{" "}
                </Link>{" "}
                {" "} including the payment terms and
                <Link href={`/privacy-policy`} className="text-blue-950 underline">
                  {" "}Privacy Policy.
                  {" "}
                </Link>
              </span>
            </div>
          </div>
        </main>

        {/* <section className="hidden md:block relative  items-end  lg:col-span-5  xl:col-span-6">
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
        </section> */}
      </div>
    </section>
  );
}

export default Register
