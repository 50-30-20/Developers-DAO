<h1 align="center">Developers-DAO</h1>

# Abstract
* The main objective of the project is to add modification to stackoverflow with help of blockchain. 
* Developers Dao is a dao/forum where developers from all the stacks region come together aiming to help and collaborate each other. 
* The Dao has an implementation of P2P tipping mechanism, this mechanism encourages the devs help and participate.
* The tokenization of valid answers gives it a different touch in form of badges. 

## Explainnatory Video
* https://youtu.be/XhmOMJywZR0
* The code is deployed to work on both florence and edo2 testnet.

# Architecture
* Users logins in with username, walletaddress etc.
* User can be both questioner/resolver.
* So far there is no admin specific role to keeps thing decentralized.
* The projects data storage and reterivation is moving to orbitdb/filecoin so it can totally be decentralized.

# Glimpse of Project
## Main Page
<img src="https://i.ibb.co/6FnMvDG/Main-PTezos.png" /><br/>

## Temple Wallet Connection
<img src="https://i.ibb.co/TLx0Pxh/Con-Wallet-Tezos.png" /><br/>

## Registeration Page
<img src="https://i.ibb.co/SJtQrs1/register-Tezos.png" /><br/>

## Qna And Tipping Page
<img src="https://i.ibb.co/Z6KR0zM/Que-Ans-Tezos.png" /><br/>

## Reward Transaction
<img src="https://i.ibb.co/S3Hk1qd/send-MTezos.png" /><br/>

## Successfull Transaction
<img src="https://i.ibb.co/WtJmXgd/Whats-App-Image-2021-08-22-at-03-50-42.jpg" /><br/>

# Project setup
* The client and server are in sepearate folders but can be run together using the help of concurently package.
* https://www.npmjs.com/package/concurrently

```
1. git clone https://github.com/50-30-20/Developers-DAO.git
2. yarn / npm i (At the root of the project)
3. cd client 
4. yarn / npm i (In client folder)
5. cd server 
6. yarn / npm i (In server folder)
7. yarn start / npm run start
```


