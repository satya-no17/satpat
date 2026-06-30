
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/nav";
import { getUser } from "@/lib/auth";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";
import { redirect } from "next/navigation";


export default async function Home() {

  const user = await checkUser()
  if (!user) {

    return (
      <div>
        <Navbar />
        <Hero />
      </div>
    );
  }
  else {
      redirect("/dashboard");
    }
  
}
