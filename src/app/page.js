
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/nav";
import { getUser } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";


export default async function Home() {
const user = await getUser()
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}
