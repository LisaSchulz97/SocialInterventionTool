import { NavLink } from '@/components/Layout'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Social Intervention Tool</title>
      </Head>

      <NavLink href='/dashboard/patients'>View Dashbord</NavLink>
    </>
  )
}
