import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">

      {/* OTP Verification | Passkey */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
        <Image 
        src="/assets/icons/Logo.png"
        height={1000}
        width={1000}
        alt="patient"
        className="mb-12 h-10 w-fit"
         />

        <PatientForm />

            <div className="text-14-regular mt-20 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">
                 © 2025 CareNest
               </p>
               <Link href="/?doctor=true" className="text-green-500">
                 Doctor
               </Link>
               <Link href="/?doctorassistant=true" className="text-green-500">
                 Doctor Assistant
               </Link>
               <Link href="/?hospitaladmin=true" className="text-green-500">
                 Hospital Admin
               </Link>
             </div>
        </div>
      </section>

      <Image
      src="/assets/images/login.jpg"
      height={700}
      width={700}
      alt="patient"
      className="side-img max-w-[50%]"
      />

    </div>
  )
}