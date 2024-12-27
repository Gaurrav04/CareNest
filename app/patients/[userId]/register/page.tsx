import Image from 'next/image'
import React from 'react'
import Link from "next/link";
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';


const Register = async ({ params: { userId } }: SearchParamProps) => {
   const user =  await getUser(userId);  //[userId]

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Image 
        src="/assets/icons/Logo.png"
        height={1000}
        width={1000}
        alt="patient"
        className="mb-12 h-10 w-fit"
         />
 
        <RegisterForm  user={user} />

              <p className="copyright">
                © 2025 CareNest
              </p>
        </div>
      </section>

      <Image
      src="/assets/images/register.jpg"
      height={700}
      width={700}
      alt="patient"
      className="side-img max-w-[390px]"
      />

    </div>
  )
}

export default Register