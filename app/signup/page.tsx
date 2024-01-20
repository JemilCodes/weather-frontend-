import Head from 'next/head'
import React from 'react'
import SignUpPage from '../Ui/component/signup'

export default function Login() {
  return (
    <div>
        <Head>
        <title>weather | signup</title>
        </Head>
        <SignUpPage/>
    </div>
  )
}
