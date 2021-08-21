import React, { useState } from 'react'
import Head from 'next/head'

import LoginForm from './login-form'
import SignUpForm from './signup-form'

import styles from './auth-forms.module.css'

const AuthForms = ({ screen = 'signup' }) => {
  const [form, setForm] = useState(screen)

  return (
    <div className={styles.authModal}>
      <Head>
        <title>{form == 'login' ? 'Log In' : 'Sign Up'} - Tezos overflow</title>
      </Head>

      <img src = {'https://akashghost.github.io/hostedassets/tezos-coin.svg'} alt='Tezos Logo' width ='110' height='110' />

      {form === 'login' ? <LoginForm /> : <SignUpForm />}

      {form === 'login' ? (
        <p className={styles.authSwichMessage}>
          Don’t have an account?{' '}
          <a onClick={() => setForm('signup')}>Sign up</a>
        </p>
      ) : (
        <p className={styles.authSwichMessage}>
          Already have an account?{' '}
          <a onClick={() => setForm('login')}>Log in</a>
        </p>
      )}
    </div>
  )
}

export default AuthForms
