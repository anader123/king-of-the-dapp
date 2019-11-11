// Contract address https://ropsten.etherscan.io/address/0x04d27c6ec43f965bd490935873c9aea6987bdef4
const abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "becomeKing",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_newKing",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_kingRansom",
				"type": "uint256"
			}
		],
		"name": "Coronation",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "King",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "kingRansom",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

module.exports = { abi };