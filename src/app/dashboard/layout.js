import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AppHeader from "@/components/app-header"
import { pool } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function Layout({ children }) {
  const user = await getUser();
  const projects = await pool.query(
    "SELECT id,name FROM projects WHERE user_id = $1",
    [user.id]
  );
 const credits = await pool.query(
    "SELECT credits FROM users WHERE email = $1",
    [user.email]
  );
  const userData = { ...user,
     projects: projects.rows,
     credits: credits.rows[0].credits
     }
  console.log(userData)
  return (
    <SidebarProvider>
      <AppSidebar userData={userData} />
      <main className="w-full" >
        <AppHeader user={user} />
        {children}
      </main>
    </SidebarProvider>
  )
}