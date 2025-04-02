'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema } from "./schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoginFormState, LoginSchema } from "@/types/login"
import { createSession } from "./actions"
import { useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function submit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)

    const session = await createSession(values)

    if (session.status === 400) {
      setIsLoading(false)

      if (session.errors === undefined) {
        toast("Error is undefined.")
        return
      }

      if (session.errors && 'error' in session.errors) {
        toast(session.errors.error)
        return
      }
    }

    if (session.status === 200) {
      router.push("/")
    }

  }

  return (
    <Form {...form}>
      <form className="bg-white p-5 rounded max-w-xl w-full h-96 grid place-items-center" onSubmit={form.handleSubmit(submit)}>
        <h1 className="text-center font-medium">Login</h1>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Insira seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Insira sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

        <div className="flex flex-col items-center justify-center">
          <Button>Acessar</Button>
        </div>
      </form>
    </Form>
  )
}
