import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import { publicFetch } from '../../../util/fetcher'

import { Spinner } from '../../icons'

import styles from './avatar-card.module.css'

import { TezosToolkit } from '@taquito/taquito';
import { ThanosWallet } from '@thanos-wallet/dapp';


// const Tezos = new TezosToolkit('https://testnet-tezos.giganode.io');

// ThanosWallet.isAvailable()
//   .then(() => {
//     const mywallet = new ThanosWallet('MyAwesomeDapp');
//     mywallet.connect('granadanet').then(() => {
//       Tezos.setWalletProvider(mywallet);
//       return mywallet.getPKH()}).then((pkh) => {
//      console.log(`Your address: ${pkh}`);
//     });
//   })
//   .catch((err) => console.log(err));


const UserAvatar = ({ username }) => {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await publicFetch.get(`/user/${username}`)
      setUserInfo(data)
    }

    fetchUser()

  }, [username])

  const wallet = userInfo.walletAddress;

  const startingthree = wallet.slice(0, 4)
  const endThree = wallet.slice(-3);
  console.log(startingthree);
  console.log(endThree);

  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
  }   
  
  function copyPP(){
    copyTextToClipboard(wallet);
    alert('text copied')
  }
  
  return (
    <div>
      <div className={styles.avatarCard}>
        {!userInfo ? (
          <div className="loading">
            <Spinner />
          </div>
        ) : (
          <div className={styles.avatar}>
            <Link href="/users/[username]" as={`/users/${username}`}>
              <a>
                <img
                  src={`https://secure.gravatar.com/avatar/${userInfo.id}?s=164&d=identicon`}
                  alt={username}
                />
              </a>
            </Link>
          </div>
        )}
        <h2 className={styles.username}>{username}</h2>
        {!userInfo ? (
          <div className="loading">
            <Spinner />
          </div>
        ) : (
          <div className={styles.created}>
            <p>
              Created:{' '}
              <span>
                {formatDistanceToNowStrict(new Date(userInfo.created), {
                  addSuffix: true
                })}
              </span>
            </p>
          </div>
        )}

        <button onClick={copyPP}>
          <div id='copyP' className={styles.copyP}>Wallet address: {startingthree}...{endThree}</div>
        </button>
      </div>
    </div>
  )
}

export default UserAvatar
