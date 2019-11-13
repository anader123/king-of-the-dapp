import React, { Component } from 'react';
import Web3 from 'web3';
import { abi } from '../../utils/contractABI';
import swal from '@sweetalert/with-react';
import ethlogo from '../../utils/ethlogo.png';

// React Components 
import ConnectMM from '../ConnectMM/ConnectMM';
import KingView from '../KingView/KingView';

export default class Dashboard extends Component {
    constructor() {
        super();
        
        this.state = {
            metamaskConnected: false,
            userAccount: "",
            ethBalance: "0",
            // Contract was already deployed to this address on the Ropsten Test Network
            contractAddress: "0xECdAb99dBa830F3a097c3bF97139E24Bd4A214d0",
            kingAddress: "",
            kingRansom: "0",
            kingAmount: "0",
            // Saving both the contract and web3 instance to the state obj
            contract: {},
            web3: {}
        };
    };
    
    // Prompts the user to connect their MetaMask account to the website
    connectMetaMask = () => {
        const { ethereum } = window;
        const { contractAddress } = this.state;
        // Creating both a web3 and contract instance
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const contract = new web3.eth.Contract(abi, contractAddress);
        // Contract was deployed to Ropsten, this checks to make sure that the user is connected to the correct network
        if(ethereum.networkVersion === "3") {
            ethereum.enable()
                .then(res => {
                    this.setState({
                        metamaskConnected: true,
                        userAccount: res[0],
                        // Storing instances in the state obj
                        contract: contract,
                        web3: web3
                    });
                    this.checkContractInfo();
                    this.checkCurrentAccount();
                    this.checkEthBalance(res[0]);
                    setInterval(() => {
                        this.checkContractInfo();
                        this.checkEthBalance(res[0]);
                    }, 25000);
                });
        }
        else {
            // Error message thrown if the user isn't connect to Ropsten
            swal({
                icon: "error",
                title: "Network Error",
                text: "Please switch to the Ropsten Test Network in your MetaMask extension"
            });
        }
    };

    // Checks the current state of the contract variables
    checkContractInfo = () => {
        const { contract, web3 } = this.state;
        // Returns which address is the current King
        contract.methods.King().call((err, res) => {
            if(!err) {
                this.setState({kingAddress: res});
            }
            else {
                console.log(err);
            }
        });
        // Returns how much Ether that address has locked up
        contract.methods.kingRansom().call((err, res) => {
            if(!err) {
                const ethAmount = +web3.utils.fromWei(res);
                this.setState({kingRansom: ethAmount.toFixed(3)})
            }
            else {
                console.log(err);
            }
        });
    };

    // Looks for the user's current Eth balance on the Ropsten Test Network, if they are on a different network it throws an error message
    checkEthBalance = (account) => {
        const { web3 } = this.state;
        if(account !== undefined) {
            web3.eth.getBalance(account, (err, res) => {
                if(!err) {
                    // The response comes back as a string, however, I only want to display 3 decimal places so I convert it to a number to use the toFixed method
                    let shortenedEthBalance = +web3.utils.fromWei(res);
                    this.setState({
                        ethBalance: shortenedEthBalance.toFixed(3)
                    })
                }
                else {
                    console.log(err)
                }
            });
        }
        else {
            this.setState({metamaskConnected: false});
        }
    };
    
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
    };
    
    // Method that creates an Eth transaction to update the state of the contract
    kingMe = () => {
        const { userAccount, kingAmount, contractAddress, web3, contract, kingRansom } = this.state;
        // Makes sure that the use has entered in an amount that is more than 0.1 Eth greater than the current kingRansom
        if(+kingAmount > (+kingRansom + 0.1)) {
            const weiValue = web3.utils.toWei(kingAmount);

            const transactionObject = {
                from: userAccount,
                to: contractAddress,
                // Value must be sent in wei
                value: weiValue,
                // Data payload for the tx. The contract will know to invoke becomeKing method and check to see if value was sent with the tx.
                data: contract.methods.becomeKing().encodeABI(),
            }

            web3.eth.sendTransaction(transactionObject)
                .then(res => {
                    swal({
                        icon: 'success',
                        title: 'Tx Successfully Sent',
                        closeOnClickOutside: false,
                        content: (
                            <div>
                                    <p>Transaction Hash:</p>
                                    <p><a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/tx/${res.transactionHash}`}>{res.transactionHash}</a></p>
                                </div>)
                        });
                    })
                .catch(err => {
                    console.log("err",err)
                });
            // Sets in the input box to zero
            this.setState({kingAmount: 0});
            // Creates an animation while the use is waiting for their tx to be submitted.
            setTimeout(() => this.blockchainMessage(), 1000);
        }
        else {
            swal({
                icon: "error",
                title: "Incorrect Amount",
                text: "The amount must be at least 0.1 greater than the current kingRansom"
            });
        }
    };
        
    blockchainMessage = () => {
        swal({
            closeOnClickOutside: false,
            button: false,
            content: (<div>
                <img className='block-load-img' src={ethlogo} alt='block loading'/>
                <p>Blockchain magic in progress...</p>
                <br/>
            </div>)
        });
    };

    // Sets the state of the kingAmount variable when the user types in the input box
    handleInputAmountChange = event => {
        this.setState({
            kingAmount: event.target.value.toString()
        });
    }; 

    render() {
        const { metamaskConnected, ethBalance, userAccount, kingAddress, kingRansom, kingAmount } = this.state;
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
                    <KingView handleInputAmountChange={this.handleInputAmountChange} ethBalance={ethBalance} userAccount={userAccount} kingAddress={kingAddress} kingAmount={kingAmount} kingRansom={kingRansom} kingMe={this.kingMe}/>
                </div>}
            </div>
        )
    }
};

