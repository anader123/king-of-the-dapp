import BigNumber from 'bignumber.js';

BigNumber.config({ DECIMAL_PLACES: 4 });

export const formatEthAmount = (amount) => {
    const bn = new BigNumber(amount);
    return bn.shiftedBy(-18).toString(10);
}