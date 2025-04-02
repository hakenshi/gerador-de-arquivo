'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Users } from '@prisma/client'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateUser } from '../../../app/(user)/usuarios/actions'
import { UserFormValues, userSchema, UserUpdateFormValues, userUpdateSchema } from '../../../app/(user)/usuarios/schema'

export default function UpdateUserForm({ updatingUser }: { updatingUser?: Users }) {

    const [isFormOpen, setIsFormOpen] = useState(false)

    const form = useForm<UserUpdateFormValues>({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            email: updatingUser?.email ?? "",
            firstName: updatingUser?.firstName ?? "",
            password: updatingUser?.password ?? "",
            secondName: updatingUser?.secondName ?? "",
        }
    })

    async function submit(values: UserUpdateFormValues) {
        const parsedValues = userUpdateSchema.safeParse(values)

        if (!parsedValues.success) {
            console.log(parsedValues.error)
            toast.error("Erro na validação dos dados do formulário.")
            return
        }

        if (updatingUser?.id === undefined) {
            toast.error("Usuário não encontrado para atualização.")
            return
        }
        if (!parsedValues.success) {
            toast.error("Erro na validação dos dados do formulário.")
            return
        }

        const { message, status } = await updateUser(updatingUser.id, {
            ...parsedValues.data,
            email: parsedValues.data.email ?? "",
        })

        if (status === 200) {
            setIsFormOpen(false)
            toast(message, {
                dismissible: true,
            })
        }

    }

    return (
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger className={buttonVariants({ variant: 'informative' })}>
                <Pencil /> Editar Usuário
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className='sr-only'>
                    <DialogTitle>Editar Usuário</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className='space-y-4' onSubmit={form.handleSubmit(submit)}>
                        <h3 className='text-center font-medium text-lg'>Editar Usuário</h3>
                        <FormField
                            name='firstName'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Primeiro Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Insira o primeiro nome' {...field} value={field.value ?? ''} />
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
                                        <Input placeholder='Insira o segundo nome' {...field} value={field.value ?? ''} />
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
                                        <Input placeholder='Insira um email' {...field} value={field.value ?? ''} />
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
                                        <Input type='password' placeholder='Insira uma senha' {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='pt-4 space-x-2 text-end'>
                            <Button variant={'confirmative'}>Editar</Button>
                            <DialogClose className={buttonVariants({ variant: 'destructive' })}>Cancelar</DialogClose>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
