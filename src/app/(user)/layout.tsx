import React from 'react'

import Navbar from "@/components/navbar"
import LogoutButton from '@/components/buttons/logout-button'

export default function HomeLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className='grid grid-cols-[0.1fr_auto] h-screen border border-black'>
            <Navbar>
                <LogoutButton />
            </Navbar>
            <main className='px-10 py-5'>{children}</main>
        </div>
    )
}
