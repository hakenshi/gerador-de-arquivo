
import { userColumns } from '@/components/data-table/columns/user-columns'
import DataTable from '@/components/data-table/data-table'
import UserForm from '../../../components/forms/user/user-form'
import { getUsers } from './actions'

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
