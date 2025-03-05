import Link from "next/link"

function CopyRights() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="col-span-6 sm:col-span-6 mt-9 mb-2 text-center">
            <span className="shrink-0 px-6 text-[#6C7278]">
                All rights reserved, LaLa ©  {currentYear}
                <Link href={`/privacy-policy`} className="text-blue-950 ">
                    {" "}
                    Privacy Policy{" "}
                </Link>{" "}
                |{" "}
                <Link href={`/terms-and-conditions`} className="text-blue-950 ">
                    {" "}
                    Terms and Conditions{" "}
                </Link>
            </span>
        </div>
    )
}

export default CopyRights
