import React from 'react'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { getUsers } from './actions'
import { useForm } from 'react-hook-form'
import UserForm from '../../../components/forms/user/user-form'
import DataTable from '@/components/data-table/data-table'
import { userColumns } from '@/components/data-table/columns/user-columns'

export default async function UsuariosPage() {

  const users = await getUsers()

  return (
    <div className='h-full grid grid-rows-2 place-items-center'>
      <div className='grid place-items-center w-full gap-10'>
        <UserForm />
        <div className='border rounded h-fit w-full'>
          <DataTable columns={userColumns} data={users} />
        </div>
      </div>
      <div className='flex items-end h-full'>
        <p>xd</p>
      </div>
    </div>
  )
}
