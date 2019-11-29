// Contract address 0x2800cC9F11E0956B20FE48FcC8b69db310D93f02 on Ropsten
const abi = [{"constant":true,"inputs":[],"name":"King","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"kingRansom","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"becomeKing","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newKing","type":"address"},{"indexed":false,"name":"_kingRansom","type":"uint256"}],"name":"Coronation","type":"event"}];

module.exports = { abi };