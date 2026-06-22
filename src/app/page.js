"use client";

import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/nav";
import Image from "next/image";
import { useRouter } from 'next/navigation';


export default function Home() {
    const router = useRouter()

  const goSignup = ()=>{
    router.push('/signup')
  }
  return (
    <div>
      <Navbar btn={goSignup}/>
      <Hero btn={goSignup}/>
    </div>
  );
  
}
