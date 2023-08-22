import { Layout } from '@/components/Layout'
import { theme } from '@/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'

import Head from 'next/head'

function TalentX({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </Head>
      <ChakraProvider
        resetCSS
        theme={theme}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default TalentX
