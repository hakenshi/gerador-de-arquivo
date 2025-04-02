'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createUser } from '../../../app/(user)/usuarios/actions'
import { UserFormValues, userSchema } from '../../../app/(user)/usuarios/schema'
import { PlusIcon, UserPlus } from 'lucide-react'

export default function UserForm() {

    const [isFormOpen, setIsFormOpen] = useState(false)

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: "",
            firstName: "",
            password: "",
            secondName: "",
        }
    })

    async function submit(values: UserFormValues) {
        const parsedValues = userSchema.safeParse(values)
        if (!parsedValues.success) {
            toast.error("Erro na validação dos dados do formulário.")
            return
        }

        const { message, status } = await createUser(parsedValues.data)

        if (status === 201 || status === 200) {
            setIsFormOpen(false)
            toast(message, {
                dismissible: true,
            })
        }

    }

    return (
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger className={buttonVariants({ variant: 'informative' })}>
                <UserPlus /> Cadastrar Usuário
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className='sr-only'>
                    <DialogTitle>Cadastrar Usuário</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className='space-y-4' onSubmit={form.handleSubmit(submit)}>
                        <h3 className='text-center font-medium text-lg'>Cadastrar Usuário</h3>
                        <FormField
                            name='firstName'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Primeiro Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Insira o primeiro nome' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='secondName'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Segundo Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Insira o segundo nome' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='email'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Insira um email' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='password'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='Insira uma senha' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='pt-4 space-x-2 text-end'>
                            <Button variant={'confirmative'}>Cadastrar</Button>
                            <DialogClose className={buttonVariants({ variant: 'destructive' })}>Cancelar</DialogClose>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
