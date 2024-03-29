import React from 'react';
import './KingView.css';
import blockies from 'ethereum-blockies-png';

export default function KingView(props) {
    const { 
        userAccount, 
        ethBalance, 
        kingRansom, 
        kingAddress, 
        kingMe, 
        handleInputAmountChange, 
        kingInputAmount,
        loading
    } = props;
    
    let URL = blockies.createDataURL({seed: kingAddress});
    return (
        <div className='dashboard-container'>

                <div className='user-info-container'>
                    <p className='user-address'>Your Address: {userAccount}</p>
                    <div>
                        <span>Balance:</span> {loading ? <span>Loading</span> : <span>{ethBalance} ETH</span>}
                    </div>
                    
                </div>

            {loading
            ?
            <div className='loading-text'>Loading...</div>
            :
            <div>
                <div className='king-info-container'>
                    <img className='blockie-img' alt='eth-blockie' src={URL} />
                    <p className='king-address'>King: {kingAddress}</p>
                    <p>King's Ransom: {kingRansom} ETH</p>
                </div>
            </div>
            }

            <div className='input-container'>
                <input className='input-box' 
                    onChange={handleInputAmountChange} 
                    value={kingInputAmount} 
                    type="number"
                />
                <button className='input-btn' onClick={kingMe}>King Me</button>
                <p className='input-text'>*The amount entered must be at least 0.1 ETH more than the current amount.</p>
            </div>

                <a target="_blank" 
                    rel="noopener noreferrer" 
                    href="https://medium.com/@0xnaderdev/king-of-the-dapp-an-overview-on-how-to-create-a-react-interface-for-an-ethereum-smart-contract-de53334619ea"
                >
                    <p className='medium-link'>Read the tutorial on Medium.</p>
                </a>
        </div>
    )
}
