import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import cn from 'classnames'
// import logoPng from './Tezos_logo.png'
// import ImageLoader from 'react-load-image';
// import logo from './tezos-coin.svg';
import logosvg from '../../icons/Logo';
 
import useComponentVisible from '../../../hooks/useComponentVisible'
import useWindowSize from '../../../hooks/useWindowSize'
import CONST from '../../../constants'
import ModalContext from '../../../store/modal'
import { AuthContext } from '../../../store/auth'

import Button from '../../button'
import NavigationDropdown from '../../navigation-dropdown'
import { Menu, Close, Logo } from '../../icons'

import styles from './header.module.css'

const Header = ({ className, ...props }) => {
  const { handleComponentVisible } = useContext(ModalContext)
  const { isAuthenticated, authState, logout } = useContext(AuthContext)

  const {
    ref,
    toggleRef,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)
  const size = useWindowSize()

  useEffect(() => {
    if (size.width > CONST.MOBILE_SIZE) {
      setIsComponentVisible(false)
    }
  }, [size])

  return (
    <header className={cn(styles.header, className)} {...props}>
      <div className={styles.container}>
        <div ref={toggleRef} className={styles.menuContainer}>
          <Button
            className={styles.menu}
            onClick={() => setIsComponentVisible((isOpen) => !isOpen)}
          >
            {isComponentVisible ? <Close /> : <Menu />}
          </Button>
        </div>
        <Button className={styles.logo} href="/">
          {/* <Logo /> */}

          {/* <ImageLoader src={logoPng}><img /></ImageLoader> */}
          {/* <img src={logoPng} alt=''/> */}
    
          <p className={styles.logo}><img src={'https://akashghost.github.io/hostedassets/tezos-coin.svg'} alt='svg' width = '55' height = '55' /></p>
          
          <span className={styles.tezos}>Tezos</span> stack<span>overflow</span>
        </Button>
        <div style={{ flex: 1 }}></div>

        {isAuthenticated() ? (
          <div className={styles.userInfo}>
            <p>
              Welcome{' '}
              <Link 
                href="/users/[user]"
                as={`/users/${authState.userInfo.username}`}
              >
                <a>{authState.userInfo.username}!</a>
              </Link>
            </p>
            <a className={styles.logout} onClick={() => logout()}>log out</a>
          </div>
        ) : (
          <>
            <Button
              className={styles.auth}
              secondary
              onClick={() => handleComponentVisible(true, 'login')}
            >
              Log in
            </Button>
            <Button
              className={styles.auth}
              primary
              onClick={() => handleComponentVisible(true, 'signup')}
            >
              Sign up
            </Button>
          </>
        )}
      </div>

      <div ref={ref}>{isComponentVisible && <NavigationDropdown />}</div>
    </header>
  )
}

export default Header