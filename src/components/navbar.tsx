'use client'

import { faFile, faHistory, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { buttonVariants } from './ui/button'
import Link from 'next/link'

export default function Navbar({ children }: { children: ReactNode }) {

    const pathName = usePathname()

    return (
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
            {children}
        </header>
    )
}
