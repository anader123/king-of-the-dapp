import React, { Component } from 'react';

// Ethereum Items
import Web3 from 'web3';
import { abi } from '../../abis/KingDappContract';
import BigNumber from 'bignumber.js';

// Sweet Alerts
import {
    networkErrorAlert,
    transactionSuccessAlert,
    invalidAmountAlert,
    sendingTransactionAlert,
    genericErrorAlert,
    installWalletAlert
} from '../../utils/alerts';

// Formatting Functions
import { formatEthAmount } from '../../utils/formatValues';

// React Components 
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import KingView from '../KingView/KingView';

export default class Dashboard extends Component {
    constructor() {
        super();
        
        this.state = {
            walletConnected: false,
            userAccount: null,
            ethBalance: null,
            // Ropsten
            contractAddress: "0x2800cC9F11E0956B20FE48FcC8b69db310D93f02",
            // Ganache
            // contractAddress: "0xABB2986b02fFfef2ac9D4fFE0397Cb0A6C254591",
            kingAddress: null,
            kingRansom: null,
            kingInputAmount: "",
            contract: {},
            web3: {},
            coronationSub: null,
            loading: true
        }
    }
    
    // Prompts the user to connect their Ethereum wallet
    connectWallet = async () => {
        const { contractAddress } = this.state;

        // Creating both a web3 and contract instance
        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(abi, contractAddress);

        if(window.ethereum) {
        // Makes sure that the user is connected to Ropsten
            if(window.ethereum.networkVersion === "3") {
                try {
                    const res = await window.ethereum.enable()
                    this.setState({
                        walletConnected: true,
                        userAccount: res[0],
                        // Storing instances in the state obj
                        contract,
                        web3
                    });
                    this.methodContainer(res);
                } catch (error) {
                    console.log(error)
                    genericErrorAlert()
                }
            } else {
                networkErrorAlert();
            }
        } else {
            installWalletAlert();
        }
    }

    // Contains methods that will run after the user connects their MetaMask account
    methodContainer = (res) => {
        this.checkContractInfo();
        this.checkCurrentAccount();
        this.checkEthBalance(res[0]);
    }

    // Checks the current state of the contract variables
    checkContractInfo = async () => {
        const { contract } = this.state;
        if(contract) {
            try{
                // Returns which address is the current King
                const kingAddress = await contract.methods.King().call();

                // Returns how much Ether is locked up in Wei
                const weiKingRansom = await contract.methods.kingRansom().call();
                const kingRansom = formatEthAmount(weiKingRansom);

                this.setState({ kingRansom, kingAddress, loading: false });
                this.coronationSubscription(contract);
            } catch (error) {
                console.log(error);
                genericErrorAlert();
            }
        } else {
            console.log('contract is not defined');
            genericErrorAlert();
        }
    }

    coronationSubscription = (contract) => {
        const coronationSub = contract.events.Coronation()
        .on('data', event => {
            const kingAddress = event.returnValues._newKing;
            const kingRansom = formatEthAmount(event.returnValues._kingRansom);

            this.setState({ kingAddress, kingRansom });
        })
        .on('error', error => {
            console.log(error);
            genericErrorAlert();
        });
        this.setState({ coronationSub });
    }

    // Looks for the user's current Eth balance on the Ropsten Test Network, if they are on a different network it throws an error message
    checkEthBalance = (account) => {
        const { web3 } = this.state;
        if(account) {
            web3.eth.getBalance(account, (err, res) => {
                if(!err) {
                    // The response comes back as a string, however, I only want to display 3 decimal places so I convert it to a number to use the toFixed method
                    const formattedEthBalance = formatEthAmount(res);
                    this.setState({
                        ethBalance: formattedEthBalance
                    })
                }
                else {
                    console.log(err);
                    genericErrorAlert();
                }
            });
        }
        else {
            this.setState({walletConnected: false});
        }
    }
    
    checkCurrentAccount = () => {
        const { ethereum } = window;
        // Prevents the page from reloading when the user changes networks. 
        ethereum.autoRefreshOnNetworkChange = false;

        // Anytime the user changes their MetaMask account this function will run and update the UI to show the selected account and its Ether balance
        ethereum.on('accountsChanged', (accounts) => {
            this.setState({ userAccount: accounts[0] });
            this.checkEthBalance(accounts[0]);
        });
    }
    
    // Method that creates an Eth transaction to update the state of the contract
    kingMe = async () => {
        const { userAccount, kingInputAmount, web3, contract, kingRansom } = this.state;

        const kingRansomTest = new BigNumber(kingRansom);
        const kingInputAmountTest = new BigNumber(kingInputAmount);

        // Makes sure that the use has entered in an amount that is at least 0.1 Eth greater than the current kingRansom
        if(kingInputAmountTest >= (kingRansomTest + 0.1) && kingInputAmount !== '') {
            const value = web3.utils.toWei(kingInputAmount);

            contract.methods.becomeKing().send({ from: userAccount, value })
                .on('receipt', (receipt) => {
                    this.checkEthBalance(userAccount);
                    transactionSuccessAlert(receipt.transactionHash);
                })
                .on('error', (error) => {
                    console.log(error);
                    genericErrorAlert();
                });

            // Sets in the input box to zero
            this.setState({ kingInputAmount: 0 });

            // Creates an animation while the use is waiting for their tx to be submitted.
            sendingTransactionAlert();
        } else {
            invalidAmountAlert();
        }
    }

    // Sets the state of the kingInputAmount variable when the user types in the input box
    handleInputAmountChange = event => {
        this.setState({
            kingInputAmount: event.target.value.toString()
        });
    }

    // Stops listening for Coronation events when the component unmounts
    componentWillUnmount() {
        const { coronationSub } = this.state;
        if(coronationSub) {
            coronationSub.unsubcribe();
        }
    }

    render() {
        const { 
            walletConnected, 
            ethBalance, 
            userAccount, 
            kingAddress, 
            kingRansom, 
            kingInputAmount,
            loading
        } = this.state;
        return (
            <div>
                {/* Conditional rendering based on if the user has connected their Ethereum wallet */}
                {!walletConnected
                ?
                <ConnectWallet connectWallet={this.connectWallet} /> 
                : 
                //  Component shows info about the user's Ethereum wallet and the state of the King of the Dapp Contract
                <KingView handleInputAmountChange={this.handleInputAmountChange} 
                ethBalance={ethBalance} 
                    userAccount={userAccount} 
                    kingAddress={kingAddress} 
                    kingInputAmount={kingInputAmount} 
                    kingRansom={kingRansom} 
                    kingMe={this.kingMe}
                    loading={loading}
                />
                }
            </div>
        )
    }
}
