import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button, buttonVariants } from '../ui/button'
import { getUserSession } from '@/server/session'
import Icon from '../icon'
import { destroySession } from '@/app/(auth)/login/actions'

export default async function LogoutButton() {

    const { user } = await getUserSession()

    return (
        <div className='flex items-end h-full'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className='hover:bg-white/30 hover:text-white capitalize p-6 flex justify-between w-'>
                        <Icon name={user.firstName} profileImage={''} /> <span>{`${user.firstName}`}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <form action={destroySession}><button type='submit'>Sair</button></form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
