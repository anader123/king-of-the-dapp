import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// Local Files
import { abi } from '../../utils/contractABI';
import swal from '@sweetalert/with-react';
import ethlogo from '../../img/ethlogo.png';

// React Components
import ConnectMM from '../ConnectMM/ConnectMM';
import KingView from '../KingView/KingView';

export default function Dashboard() {
    // React Hooks
    const [metamaskConnected, setMetaMaskConnect] = useState(false);
    const [userAccount, setUserAccount] = useState("");
    const [ethBalance, setEthBalance] = useState("0");
    // Contract was already deployed to this address on the Ropsten Test Network
    const [contractAddress] = useState("0x2800cC9F11E0956B20FE48FcC8b69db310D93f02");
    const [kingAddress, setKingAddress] = useState("");
    const [kingRansom, setKingRansom] = useState("0");
    const [kingAmount, setKingAmount] = useState("0");
    // Saving both the contract and web3 instance
    const [contract, setContract] = useState({});
    const [web3, setWeb3] = useState({});

    useEffect( () => {
        // Creating both a web3 and contract instance
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const contract = new web3.eth.Contract(abi, contractAddress);
        // Storing instances
        setContract(contract);
        setWeb3(web3);
    }, [contractAddress]);

    // Prompts the user to connect their MetaMask account to the website
    const connectMetaMask = () => {
        const { ethereum } = window;
        // Contract was deployed to Ropsten, this checks to make sure that the user is connected to the correct network
        if(ethereum.networkVersion === "3") {
            ethereum.enable()
                .then(res => {
                    setMetaMaskConnect(true);
                    setUserAccount(res[0]);
                    checkContractInfo();
                    checkCurrentAccount();
                    checkEthBalance(res[0]);
                    setInterval(() => {
                        checkContractInfo();
                        checkEthBalance(res[0]);
                    }, 25000);
                })
                .catch(err => console.log(err));
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
    const checkContractInfo = () => {
        // Returns which address is the current King
        contract.methods.King().call((err, res) => {
            if(!err) {
                setKingAddress(res);
            }
            else {
                console.log(err);
            }
        });
        // Returns how much Ether that address has locked up
        contract.methods.kingRansom().call((err, res) => {
            if(!err) {
                const ethAmount = +web3.utils.fromWei(res);
                setKingRansom(ethAmount.toFixed(3));
            }
            else {
                console.log(err);
            }
        });
    };

    // Looks for the user's current Eth balance on the Ropsten Test Network, if they are on a different network it throws an error message
    const checkEthBalance = (account) => {
        if(account !== undefined) {
            web3.eth.getBalance(account, (err, res) => {
                if(!err) {
                    // The response comes back as a string, however, I only want to display 3 decimal places so I convert it to a number to use the toFixed method
                    let shortenedEthBalance = +web3.utils.fromWei(res);
                    setEthBalance(shortenedEthBalance.toFixed(3));
                }
                else {
                    console.log(err)
                }
            });
        }
        else {
            setMetaMaskConnect(false);
        }
    };

    const checkCurrentAccount = () => {
        const { ethereum } = window;
        // Prevents the page from reloading when the user changes networks. 
        ethereum.autoRefreshOnNetworkChange = false;
        // Anytime the user changes their MetaMask account this function will run and update the UI to show the selected account and its Ether balance
        ethereum.on('accountsChanged', (accounts) => {
            setUserAccount(accounts[0]);
            checkEthBalance(accounts[0]);
        });
    };

    // Method that creates an Eth transaction to update the state of the contract
    const kingMe = () => {
        // Makes sure that the use has entered in an amount that is at least 0.1 Eth greater than the current kingRansom
        if(+kingAmount >= (+kingRansom + 0.1)) {
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
                                <p>
                                    <a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/tx/${res.transactionHash}`}>{res.transactionHash}</a>
                                </p>
                            </div>)
                        });
                    })
                .catch(err => {
                    console.log("err",err);
                    swal({
                        icon: "error",
                        title: "Transaction Failed",
                        text: "There was an error sending this transaciton.",
                        button: true
                    })
                });
            // Sets in the input box to zero
            setKingAmount("0")
            // Creates an animation while the use is waiting for their tx to be submitted.
            setTimeout(() => blockchainMessage(), 1000);
        }
        else {
            swal({
                icon: "error",
                title: "Incorrect Amount",
                text: "The amount entered must be at least 0.1 ETH greater than the current King's Ransom."
            });
        }
    };

    const blockchainMessage = () => {
        swal({
            closeOnClickOutside: false,
            button: false,
            content: 
            (<div>
                <img className='block-load-img' src={ethlogo} alt='block loading'/>
                <p>Blockchain magic in progress...</p>
                <br/>
            </div>)
        });
    };

    // Sets the state of the kingAmount variable when the user types in the input box
    const handleInputAmountChange = event => {
        setKingAmount(event.target.value.toString())
    }; 

    return (
        <div>
            {/* Conditional rendering based on if the user has connected their MetaMask account */}
            {!metamaskConnected
            ?
            <div>
                <ConnectMM connectMetaMask={connectMetaMask} /> 
            </div>
            : 
            <div>
                {/* View that shows info about the user's MetaMask account and the state of the King of the Dapp Contract */}
                <KingView handleInputAmountChange={handleInputAmountChange} ethBalance={ethBalance} userAccount={userAccount} kingAddress={kingAddress} kingAmount={kingAmount} kingRansom={kingRansom} kingMe={kingMe}/>
            </div>}
        </div>
    )
}
