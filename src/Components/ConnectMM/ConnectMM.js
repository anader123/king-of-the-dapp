import React from 'react';
import './ConnectMM.css';

export default function ConnectMM(props) {
    const { connectMetaMask } = props;
    return (
        <div className='connect-container'>
            <p className='mm-message'>Please make sure that you are connected to the Ropsten Test Network.</p>
            <button onClick={connectMetaMask}>Connect MM</button>
            <a className='mm-download' target="_blank" rel="noopener noreferrer" href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>
                <span>Download MetaMask</span>
            </a>
        </div>
    )
};

