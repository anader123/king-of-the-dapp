import React from 'react';
import swal from '@sweetalert/with-react';
import ethlogo from '../img/ethlogo.png';

export const networkErrorAlert = () => {
    return swal({
            icon: "error",
            title: "Network Error",
            text: "Please switch to the Ropsten Test Network in your MetaMask extension"
        })
}

export const transactionSuccessAlert = (txHash) => {
    return swal({
            icon: 'success',
            title: 'Tx Successfully Sent',
            closeOnClickOutside: false,
            content: (
                <div>
                    <p>Transaction Hash:</p>
                    <p>
                        <a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/tx/${txHash}`}>{txHash}</a>
                    </p>
                </div>)
        })
}

export const invalidAmountAlert = () => {
    return swal({
            icon: "error",
            title: "Invalid Amount",
            text: "The ETH amount you have entered is not enough.",
            button: true
        })
}

export const sendingTransactionAlert = () => {
    return swal({
            closeOnClickOutside: false,
            button: false,
            content: (<div>
                <img className='block-load-img' src={ethlogo} alt='block loading'/>
                <p>Blockchain magic in progress...</p>
                <br/>
            </div>)
        })
}

export const genericErrorAlert = () => {
    return swal({
            icon: "error",
            title: "Error",
            text: "An error has occurred.",
            button: true
        })
}

export const installWalletAlert = () => {
    return swal({
            icon: "error",
            title: "Ethereum Wallet Missing",
            text: "Please make sure that you have an Ethereum wallet installed.",
            button: true
    })
}