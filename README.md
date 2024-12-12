# Guidelines on how to run this project

### Setup Frontend
- Navigate to the crypto-web folder and run command 
`
    npm i
`

- Make sure you have nodejs + npm installed.

### Setup Backend
- Navigate to the crypto-server folder and run command
`
    npm i
`

### Setup Environment variables
- Get Coin Gecko Api Key from your [account]('https://www.coingecko.com/en/developers/dashboard')
- Navigate to the crypto-server folder and replace your api key as described in .env.example
- Now get your mongodb uri and do the same.


### Run Project
- Open 2 terminals side by side.
- open crypto-web on 1 terminal and crypto-server on another
- for crypto-web, run command `npm run start`
- for crypto-server, run command `npm run dev`