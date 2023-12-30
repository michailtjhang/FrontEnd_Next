import { getServerSession } from 'next-auth'
import { authOptions } from './auth/auth'
import Lists from './components/list'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className='grid justify-center items-center h-[80vh]'>
      <Lists />

      <pre>{JSON.stringify(session)}</pre>
    </div>
  )
}
