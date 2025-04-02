'use client'

import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faFile, faHistory, faHome, faPeopleGroup, faUserAlt, faUsers } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { usePathname } from 'next/navigation'

export default function HomeLayout({ children }: { children: React.ReactNode }) {

    const pathName = usePathname()

    return (
        <div className='grid grid-cols-[0.1fr_auto] h-screen border border-black'>
            <header className='bg-sky-700 w-50 p-5 h-full grid grid-rows-3 place-items-center text-white'>
                <Link href={"/documentos"} className='flex justify-center items-start h-full'>
                    <Image width={100} height={100} alt='img' src={"/sjbv-logo.png"} />
                </Link>
                <nav className='h-full flex flex-col justify-center gap-7'>
                    <Link href={"/documentos"} className={`${buttonVariants({ variant: 'ghost', class: "hover:bg-white/30 hover:text-white w-full" })} ${pathName.includes('/documentos') ? "active" : ""}`}>
                        <FontAwesomeIcon icon={faFile} /> Documentos
                    </Link>
                    <Link href={"/usuarios"} className={`${buttonVariants({ variant: 'ghost', class: "hover:bg-white/30 hover:text-white w-full" })} ${pathName.includes('/usuarios') ? "active" : ""}`}>
                        <FontAwesomeIcon icon={faUserAlt} /> Usuários
                    </Link>
                    <Link href={"/changelog"} className={`${buttonVariants({ variant: 'ghost', class: "hover:bg-white/30 hover:text-white w-full" })} ${pathName.includes('/changelog') ? "active" : ""}`}>
                        <FontAwesomeIcon icon={faHistory} /> Changelog
                    </Link>
                </nav>
                <div className='flex items-end h-full'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className={buttonVariants({ variant: 'ghost', class: "hover:bg-white/30 hover:text-white w-full" })}>
                        Teste
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                Sair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className='px-10 py-5'>{children}</main>
        </div>
    )
}
