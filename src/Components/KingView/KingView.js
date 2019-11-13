import React from 'react';
import './KingView.css';
import blockies from 'ethereum-blockies-png';

export default function KingView(props) {
    const { userAccount, ethBalance, kingRansom, kingAddress, kingMe, handleInputAmountChange, kingAmount } = props;
    let URL = blockies.createDataURL({seed: kingAddress});
    return (
        <div className='dashboard-container'>
            <div className='user-info-container'>
                <p className='user-address'>Your Address: {userAccount}</p>
                <p>Balance: {ethBalance} ETH</p>
            </div>
            <div className='king-info-container'>
                <img className='blockie-img' alt='eth-blockie' src={URL} />
                <p className='king-name'>King: {kingAddress}</p>
                <p>King's Ransom: {kingRansom} ETH</p>
            </div>
            <div className='input-container'>
                <input className='input-box' onChange={handleInputAmountChange} value={kingAmount} type="number"/>
                <button className='input-btn' onClick={kingMe}>King Me</button>
                <p className='input-text'>*The amount entered must be greater than the current King's Ransom by more than 0.1 ETH.</p>
            </div>
            <p className='medium-link'>Read the tutorial on Medium.</p>
        </div>
    )
}
