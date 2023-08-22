import { Stack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'

const PatientsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Social Intervention Tool</title>
      </Head>

      <Stack>
        <Text>Patienten</Text>
      </Stack>
    </>
  )
}

export default PatientsPage
