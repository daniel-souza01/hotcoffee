import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { SessionProvider } from 'next-auth/react'
import { PrismicProvider } from '@prismicio/react'
import { client } from '../services/prismic'

import '../styles/global.scss'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import '../styles/nprogress.scss'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <PrismicProvider client={client}>
        <SessionProvider session={session}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </SessionProvider>
      </PrismicProvider>
    </>
  )
}

export default MyApp
