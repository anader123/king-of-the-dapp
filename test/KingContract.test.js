const KingDappContract = artifacts.require('./KingDappContract');
require('chai')
.use(require('chai-as-promised'))
.should();

contract('KingDappContract', ([deployer, newKing, failAccount]) => {
    let kingDapp 

    beforeEach(async () => {
        kingDapp = await KingDappContract.new();
    })

    describe('deployment tests', () => {
        it('tracks king address', async () => {
            const result = await kingDapp.King();
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
                result = await kingDapp.King();
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
                event._newKing.should.equal(newKing, 'king address is correct');
                event._kingRansom.toString().should.equal(web3.utils.toWei('1', 'ether'), 'kingRansom is correct');
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