const KingDappContract = artifacts.require('./KingDappContract');
require('chai')
.use(require('chai-as-promised'))
.should();

contract('KingDappContract', ([deployer, newKing, failAccount, testKing]) => {
    let kingDapp 

    beforeEach(async () => {
        kingDapp = await KingDappContract.new();
    })

    describe('deployment tests', () => {
        it('tracks king address', async () => {
            const result = await kingDapp.king();
            result.should.equal(deployer);
        })

        it('tracks king ransom', async () => {
            const result = await kingDapp.kingRansom();
            result.toString().should.equal('0');
        })
    })

    describe('fallback test', () => {
        it('reverts when only Ether is sent', async () => {
            const value = web3.utils.toWei('1', 'ether');
            await kingDapp.sendTransaction({ from: failAccount, value }).should.be.rejectedWith('VM Exception while processing transaction: revert');
        })
    })

    describe('changing kings', () => {
        let result;
        let changeKings;

        beforeEach(async () => {
            const value = web3.utils.toWei('1', 'ether');
            changeKings = await kingDapp.becomeKing({ from: newKing, value });
        })

        describe('success', async () => {
            
            it('should update the King to the senders address', async () => {
                result = await kingDapp.king();
                result.should.equal(newKing);
            })

            it('should update the King Ransom to the senders amount', async () =>{
                result = await kingDapp.kingRansom();
                result = web3.utils.fromWei(result)
                result.should.equal('1');
            })

            it('should emit a "Coronation" event', () => {
                const log = changeKings.logs[0];
                log.event.should.equal('Coronation');
                const event = log.args;
                event.newKing.should.equal(newKing, 'king address is correct');
                event.kingRansom.toString().should.equal(web3.utils.toWei('1', 'ether'), 'kingRansom is correct');
            })

            describe('refunding previous king', () => {
                let king; 

                beforeEach(async () => {
                    king = await kingDapp.king();
                    const value = web3.utils.toWei('2', 'ether');
                    changeKings = await kingDapp.becomeKing({ from: testKing, value });
                })

                it('should add old king balance to the refund mapping', async () => {
                    result = await kingDapp.refunds(king);
                    result = web3.utils.fromWei(result);
                    result.should.equal('1');
                })

                it('should emit a "Refund" event', async () => {
                    const refund = await kingDapp.withdrawRefund({ from: newKing });
                    const log = refund.logs[0];
                    log.event.should.equal('Refund');
                    const event = log.args;
                    event.to.should.equal(newKing, 'king address is correct');
                    event.refundAmount.toString().should.equal(web3.utils.toWei('1', 'ether'), 'kingRansom is correct');
                })
    
                it('should update the refunds mapping after the refund is send', async () => {
                    await kingDapp.withdrawRefund({ from: newKing });
                    result = await kingDapp.refunds(king);
                    result.toString().should.equal('0');
                })
            })

        })

        describe('failure', async () => {
            it('should fail if the proposed kingRansom is less than the current amount', async () => {
                const value = web3.utils.toWei('0.99', 'ether');
                const result = kingDapp.becomeKing({ from: failAccount, value });
                result.should.be.rejectedWith('VM Exception while processing transaction: revert');
            })

            it('should fail if the proposed kingRansom is not more than 0.1 ETH than the current amount', async () => {
                const value = web3.utils.toWei('1.09', 'ether');
                const result = kingDapp.becomeKing({ from: failAccount, value });
                result.should.be.rejectedWith('VM Exception while processing transaction: revert');
            })
        })
    })
})