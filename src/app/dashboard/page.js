import Hero from "@/components/hero";
import { getUser } from "@/lib/auth";
import { pool } from "@/lib/db";

export default async function Page() {
  const user = await getUser();
  const projects = await pool.query(
    "SELECT * FROM projects WHERE user_id = $1",
    [user.id]
  );

  const userData = { ...user, projects: projects }
  console.log(userData)

  return (
    <div>
      <Hero />
    </div>
  );
}