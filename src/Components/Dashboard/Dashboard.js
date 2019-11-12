import React, { Component } from 'react';
import Web3 from 'web3';
import { abi } from '../../utils/contractABI';
import swal from '@sweetalert/with-react';
import './Dashboard.css';
import ethlogo from '../../utils/ethlogo.png';

// React Components 
import ConnectMM from '../ConnectMM';
import KingView from '../KingView';

export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            metamaskConnected: false,
            userAccount: null,
            ethBalance: null,
            contractAddress: "0xECdAb99dBa830F3a097c3bF97139E24Bd4A214d0",
            kingAddress: null,
            kingRansom: null,
            kingAmount: 0,
        }
    };

    connectMetaMask = () => {
        const { ethereum } = window;
        ethereum.enable()
            .then(res => {
                this.setState({
                    metamaskConnected: true,
                    userAccount: res[0]
                });
                this.checkEthBalance(res[0]);
                this.checkContractInfo();
                this.checkCurrentAccount();
                setInterval(() => {
                    this.checkContractInfo();
                }, 20000);
            });

    };

    kingMe = () => {
        const { userAccount, kingAmount, contractAddress } = this.state;
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const contract = new web3.eth.Contract(abi, contractAddress);
        const weiValue = web3.utils.toWei(kingAmount);
        const transactionObject = {
            from: userAccount,
            to: contractAddress,
            value: weiValue,
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
        this.setState({kingAmount: 0});
        setTimeout(() => this.blockchainMessage(), 1000);
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

    handleInputAmountChange = event => {
        this.setState({
            kingAmount: event.target.value
        });
    }; 

    checkContractInfo = () => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const { contractAddress } = this.state;
        const contract = new web3.eth.Contract(abi, contractAddress);
        contract.methods.King().call((err, res) => {
            if(!err) {
                this.setState({kingAddress: res});
            }
            else {
                console.log(err);
            }
    });

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

    checkCurrentAccount = () => {
        const { ethereum } = window;
        ethereum.on('accountsChanged', (accounts) => {
            this.setState({
                userAccount: accounts[0]
            });
            this.checkEthBalance(accounts[0]);
        });
    };

    checkEthBalance = (account) => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        if(account !== undefined) {
            web3.eth.getBalance(account, (err, res) => {
                if(!err) {
                    let shortenedEthBalance = +web3.utils.fromWei(res);
                    this.setState({
                        ethBalance: shortenedEthBalance.toFixed(3)
                    })
                }
                else {
                    console.log(err)
                }
            })
        }
        else {
            this.setState({metamaskConnected: false})
        }
    };

    render() {
        const { metamaskConnected, ethBalance, userAccount, kingAddress, kingRansom, kingAmount } = this.state;
        return (
            <div>
                {!metamaskConnected
                ?
                <div>
                    <ConnectMM connectMetaMask={this.connectMetaMask} /> 
                </div>
                : 
                <div>
                    <KingView handleInputAmountChange={this.handleInputAmountChange} ethBalance={ethBalance} userAccount={userAccount} kingAddress={kingAddress} kingAmount={kingAmount} kingRansom={kingRansom} kingMe={this.kingMe}/>
                </div>}
            </div>
        )
    }
};

