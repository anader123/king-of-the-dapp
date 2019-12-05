import React from 'react';
import './ConnectWallet.css';

export default function ConnectWallet(props) {
    const { connectWallet } = props;
    return (
        <div className='connect-container'>
            <p className='mm-message'>Please make sure that you are connected to the Ropsten Test Network.</p>
            <button onClick={connectWallet}>Connect Wallet</button>
            <a className='mm-download' 
                target="_blank" 
                rel="noopener noreferrer" 
                href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
            >
                Download MetaMask
            </a>
        </div>
    )
};

