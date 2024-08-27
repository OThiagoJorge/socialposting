'use client'
import './globals.css'
import { ApolloProvider } from '@apollo/client'
import client from './apolloclient'
import InsertName from './page'

export default function Layout(){
  return (
    <html lang="pt-br">
      <body>
        <ApolloProvider client={client}>
          <InsertName />
        </ApolloProvider>
      </body>
    </html>
  )
}