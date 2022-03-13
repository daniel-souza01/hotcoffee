import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { Client as FaunaClient } from 'faunadb'
import { FaunaAdapter } from '@next-auth/fauna-adapter'

const client = new FaunaClient({
  secret: process.env.FAUNADB_KEY,
  domain: 'db.us.fauna.com'
  // scheme: 'http',
  // domain: 'localhost',
  // port: 8443
})

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  adapter: FaunaAdapter(client)
})
