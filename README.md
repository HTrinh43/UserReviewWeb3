# UserReviewWeb3
A Web app using Web3.0 to store review of user.
Flask for backend and React.js for frontend.

Instruction
Goto deploy/
Run "brownie compile"

Start the blockchain locally using Ganache in a terminal in same folder and leave it open.
Run "ganache-cli"
In /deploy/, Run the following command to execute the deploy script
Run "brownie run deploy --network development"

You will see a similar output:

Running 'scripts/deploy.py::main'...
Transaction sent: 0x3bdc20f80e56515849d24873c1aafdb0573155633d8af58507a7134905de0ab5
  Gas price: 0.0 gwei   Gas limit: 6721975   Nonce: 3
  SimpleStorage.constructor confirmed   Block: 4   Gas used: 395783 (5.89%)
  SimpleStorage deployed at: 0x8Ec9eAbdc64d6adc618c98860D4734eBA23Fc435
  
 Copy the smart contract address given after SimpleStorage deployed at:. It will be used later.
 
Start the brownie console:
"brownie console"
Connect to the deployed contract:
"contract = SimpleStorage.at('<Contract address>')"

Use addReview function to add new review:
"contract.addReview("Key", "A sample review", {'from': accounts[0]})"

Use getReviews function to get existing review with key:
"contract.getReviews("Key")"

To Run the server:
Move to /application/frontend directory
"npm run start-backend"

Open new terminal in same directory to start the frontend
"npm run start"
