import Hero from "@/components/hero";
import { getUser } from "@/lib/auth";
import { pool } from "@/lib/db";

export default async function Page() {

  return (
    <div>
      <Hero />
    </div>
  );
}