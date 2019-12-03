import React, { Component } from 'react';
import Web3 from 'web3';
import { abi } from '../../utils/contractABI';
import BigNumber from 'bignumber.js';

// Sweet Alerts
import {
    networkErrorAlert,
    transactionSuccessAlert,
    transactionFailedAlert,
    sendingTransactionAlert,
    genericErrorAlert,
    installMetaMaskAlert
} from '../../utils/alerts';

// Formatting Functions
import { formatEthAmount } from '../../utils/formatValues';

// React Components 
import ConnectMM from '../ConnectMM/ConnectMM';
import KingView from '../KingView/KingView';

export default class Dashboard extends Component {
    constructor() {
        super();
        
        this.state = {
            metamaskConnected: false,
            userAccount: null,
            ethBalance: null,
            // contractAddress: "0x2800cC9F11E0956B20FE48FcC8b69db310D93f02",
            contractAddress: "0xABB2986b02fFfef2ac9D4fFE0397Cb0A6C254591",
            kingAddress: null,
            kingRansom: null,
            kingInputAmount: "",
            contract: {},
            web3: {},
            coronationSub: null
        }
    }
    
    // Prompts the user to connect their MetaMask account
    connectMetaMask = async () => {
        const { ethereum } = window;
        const { contractAddress } = this.state;

        // Creating both a web3 and contract instance
        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(abi, contractAddress);

        if(ethereum) {
        // The if statement checks to make sure that they are connected to the Ropsten Network
            // if(ethereum.networkVersion === "3") {
                try {
                    const res = await ethereum.enable()
                    this.setState({
                        metamaskConnected: true,
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
            // } else {
            //     // Error alert thrown if the user isn't connect to Ropsten
            //     networkErrorAlert();
            // }
        } else {
            installMetaMaskAlert();
        }
    }

    // Contains methods that will run after the user connects their MetaMask account
    methodContainer = (res) => {
        this.checkContractInfo();
        this.checkCurrentAccount();
        this.checkEthBalance(res[0]);
        setInterval(() => {
            this.checkEthBalance(res[0]);
        }, 25000);
    }

    // Checks the current state of the contract variables
    checkContractInfo = async () => {
        const { contract } = this.state;
        if(contract) {
            // Returns which address is the current King
            try{
                const kingAddress = await contract.methods.King().call();
                this.setState({ kingAddress });
            } catch (error) {
                console.log(error);
                genericErrorAlert();
            }

            // Returns how much Ether that address has locked up
            try {
                const response = await contract.methods.kingRansom().call();
                const kingRansom = formatEthAmount(response);
                this.setState({ kingRansom });
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
        if(account !== undefined) {
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
            this.setState({metamaskConnected: false});
        }
    }
    
    checkCurrentAccount = () => {
        const { ethereum } = window;
        // Prevents the page from reloading when the user changes networks. 
        ethereum.autoRefreshOnNetworkChange = false;

        // Anytime the user changes their MetaMask account this function will run and update the UI to show the selected account and its Ether balance
        ethereum.on('accountsChanged', (accounts) => {
            this.setState({
                userAccount: accounts[0]
            });
            this.checkEthBalance(accounts[0]);
        });
    }
    
    // Method that creates an Eth transaction to update the state of the contract
    kingMe = async () => {
        const { userAccount, kingInputAmount, web3, contract, kingRansom } = this.state;

        const kingRansomTest = new BigNumber(kingRansom);
        const kingInputAmountTest = new BigNumber(kingInputAmount);

        // Makes sure that the use has entered in an amount that is at least 0.1 Eth greater than the current kingRansom
        if(kingInputAmountTest >= (kingRansomTest + 0.1)) {
            const value = web3.utils.toWei(kingInputAmount);

            contract.methods.becomeKing().send({ from: userAccount, value })
                .on('receipt', (txHash) => {
                    transactionSuccessAlert(txHash);
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
            console.log('hit')
            transactionFailedAlert();
        }
    }

    // Sets the state of the kingInputAmount variable when the user types in the input box
    handleInputAmountChange = event => {
        this.setState({
            kingInputAmount: event.target.value.toString()
        });
    }

    render() {
        const { metamaskConnected, ethBalance, userAccount, kingAddress, kingRansom, kingInputAmount } = this.state;
        return (
            <div>
                {/* Conditional rendering based on if the user has connected their MetaMask account */}
                {!metamaskConnected
                ?
                <div>
                    <ConnectMM connectMetaMask={this.connectMetaMask} /> 
                </div>
                : 
                <div>
                    {/* View that shows info about the user's MetaMask account and the state of the King of the Dapp Contract */}
                    <KingView handleInputAmountChange={this.handleInputAmountChange} ethBalance={ethBalance} userAccount={userAccount} kingAddress={kingAddress} kingInputAmount={kingInputAmount} kingRansom={kingRansom} kingMe={this.kingMe}/>
                </div>}
            </div>
        )
    }
}
