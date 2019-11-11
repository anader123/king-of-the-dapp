import React, { Component } from 'react'

export default class ConnectMM extends Component {
    render() {
        const { connectMetaMask } = this.props;
        return (
            <div className='connect-container'>
                <button onClick={connectMetaMask}>Connect MM</button>
                <a className='mm-download' target="_blank" rel="noopener noreferrer" href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'><span>Download MetaMask</span></a>
            </div>
        )
    }
}
