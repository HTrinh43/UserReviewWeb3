from brownie import SimpleStorage, accounts

def main():
    SimpleStorage.deploy({'from': accounts[0]})