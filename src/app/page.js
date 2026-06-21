import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/nav";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
    </div>
  );
}
