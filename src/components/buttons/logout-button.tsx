import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { buttonVariants } from '../ui/button'
import { getUserSession } from '@/server/session'

export default async function LogoutButton() {

    const { user } = await getUserSession()

    return (
        <div className='flex items-end h-full'>
            <DropdownMenu>
                <DropdownMenuTrigger className={buttonVariants({ variant: 'ghost', class: "hover:bg-white/30 hover:text-white w-full capitalize" })}>
                    {`${user.firstName}`}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        Sair
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
