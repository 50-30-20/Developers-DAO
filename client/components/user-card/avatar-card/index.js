import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import { publicFetch } from '../../../util/fetcher'

import { Spinner } from '../../icons'

import styles from './avatar-card.module.css'

import { DAppClient, TezosOperationType, NetworkType } from "@airgap/beacon-sdk";

let startingthree
let endThree
let wallet


const dAppClient = new DAppClient({ name: "Beacon Docs", preferredNetwork: NetworkType.EDONET, });


const UserAvatar = ({ username }) => {

  const[modal, setModal] = useState(false);
 
  const [userInfo, setUserInfo] = useState(null)
  const [wad, setWad] = useState()
  const [amount, setAmount] = useState(null)
  const [userAdr, setUd] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await publicFetch.get(`/user/${username}`)
      setUserInfo(data)
      setWad(data.walletAddress)
    }

    fetchUser()

  }, [username])


  const toggleModal = () =>{
    setModal(!modal)
  }

  const handleWalletText = (e)=> {
    setAmount(e.target.value)
    console.log(amount);
  }
  
  const wallett = async ()=>{
    wallet = await wad;
    try{
      startingthree = await wad.slice(0, 4)
      endThree = await wad.slice(-3);
    }catch(e){
      console.log(e);
    }
  }
  wallett();

  // function copyTextToClipboard(text) {
  //   if (!navigator.clipboard) {
  //       fallbackCopyTextToClipboard(text);
  //       return;
  //   }
  //   navigator.clipboard.writeText(text).then(function() {
  //       console.log('Async: Copying to clipboard was successful!');
  //   }, function(err) {
  //       console.error('Async: Could not copy text: ', err);
  //   });
  // }   
  
  // function copyPP(){
  //   copyTextToClipboard(wallet);
  //   // alert('Wallet Address copied')
  // }

  const tran = async () =>{
    try {
      console.log("Requesting permissions...");
      const permissions = await dAppClient.requestPermissions({
        network: {
          type: NetworkType.EDONET,
        },
      });;
      // console.log("Got permissions:", permissions.address.toString());
    } catch (error) {
      console.log("Got error:", error);
    }
    const activeAccount = await dAppClient.getActiveAccount();
    if (activeAccount) {
      // User already has account connected, everything is ready
      // You can now do an operation request, sign request, or send another permission request to switch wallet
      console.log("Already connected:", activeAccount.address);
      const Udd = activeAccount.address
      setUd(Udd)
      return activeAccount;
    } else {
      // The user is not connected. A button should be displayed where the user can connect to his wallet.
      console.log("Not connected!");
    }
  }
  // tran()
  
  const fast = async () =>{
    const response = dAppClient.requestOperation({
      operationDetails: [
        {
          kind: TezosOperationType.TRANSACTION,
          destination: wad, // Send to ourselves
          amount: amount, // Amount in mutez, the smallest unit in Tezos
        },
      ],
    });
    console.log('res',response);
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
        <p className={styles.reward}>Reward</p>
        <button >
          <div id='copyP' className={styles.copyP}><a className={styles.ConnectWallet} onClick={toggleModal}>Wallet address: {startingthree}...{endThree}</a></div>
        </button>
      </div>

      {modal &&(
        <div className={styles.modal_main}>
        <div className={styles.overlay}></div>
          <div className={styles.modal}>
            <div className={styles.hello}><h1>Reward</h1></div>
            <form className={styles.inputText}>
              <label>Recipient</label>
              <input type='text' value={wad} name='wallet' className={styles.input} onChange={console.log("a")}></input><br/>
              <label>Amount</label>
              <input type='text' value={amount} name='wallet' className={styles.input} onChange={handleWalletText}></input>
            </form>
          </div>
          <button className={styles.btn} onClick={tran}>Connect Wallet</button><br/>
          <label>Your Address</label>
          <input readOnly type='text' value={userAdr} name='wallet' className={styles.input} onChange={console.log("a")}></input>
          <button className={styles.btn} onClick={fast}>Send</button><br/>
          <button className={styles.btn_close} onClick={toggleModal}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
