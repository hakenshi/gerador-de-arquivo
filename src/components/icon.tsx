import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function Icon({ name, profileImage }: { name: string, profileImage: string }) {
    return (
        <Avatar>
            <AvatarImage src={profileImage} alt={`foto de perfil do ${name}`} />
            <AvatarFallback className='bg-sky-400 uppercase'>
                {`${name[0]}${name[1]}`}
            </AvatarFallback>
        </Avatar>
    )
}
