'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e) => {
    let shouldKeepLoading = false

    e.preventDefault();

    try {
      setLoading(true)
      const formData = new FormData(e.target)
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        shouldKeepLoading = true
        setRedirecting(true)
        router.replace('/dashboard')
        return
      }
      else {
        alert(data.message || "Invalid credential")
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
    finally {
      if (!shouldKeepLoading) setLoading(false)
    }
  };

  return (
    <div className="flex flex-col gap-6">

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>

        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" name='email' placeholder="m@example.com" required disabled={loading || redirecting} />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required disabled={loading || redirecting} />
              </Field>
              <Field>
                <Button type="submit" disabled={loading || redirecting}>
                  {redirecting ? 'Redirecting to dashboard…' : 'Login'}
                  {(loading || redirecting) && <Spinner className="size-6" />}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
