from flask import Flask, render_template, request
import requests
import json
from web3 import Web3, HTTPProvider

# Connecting to the node
w3 = Web3(HTTPProvider('http://127.0.0.1:8545'))
f = open('/usercode/deploy/build/contracts/SimpleStorage.json')
data = json.load(f)

abi = data['abi']
# Add the contract address here
address = '0x795F823FE346788ad757ac6E28124C29DD3afB53'

# Creating a contract object
contract = w3.eth.contract(address=address, abi=abi)

# Ensuring connection with the contract
isConnected = w3.isConnected()
blocknumber = w3.eth.blockNumber

account = w3.eth.accounts[0]
balance = w3.eth.get_balance(account)

print('Connected:', isConnected, 'BlockNumber:', blocknumber, 'Account Balance:', w3.fromWei(balance, 'Ether'))

# Setting the default account
w3.eth.defaultAccount = account

app = Flask(__name__)

@app.route('/reviews', methods=['GET'])
def reviews():
    # Extract key from the request
    key = request.args['key']

    # Call the getReviews function with the key passed
    buffer = contract.functions.getReviews(key).call()

    # Return the rendered template
    return render_template('reviews.html', key = key, revs = buffer)

@app.route('/add', methods=['GET'])
def success():
    # Extract key and value from the request
    arg1 = request.args['key']
    arg2 = request.args['value']

    # Call the addReview function with the key and value passed
    tx = contract.functions.addReview(arg1, arg2).transact()

    # Check if transaction is successful
    if w3.eth.wait_for_transaction_receipt(tx)['status']:
        return "True"
    else:
        return "False"