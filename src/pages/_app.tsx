import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
