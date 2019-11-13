(this["webpackJsonpking-of-the-dapp"]=this["webpackJsonpking-of-the-dapp"]||[]).push([[0],{227:function(e,t){e.exports={abi:[{constant:!0,inputs:[],name:"King",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"kingRansom",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"becomeKing",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{inputs:[],payable:!0,stateMutability:"payable",type:"constructor"},{payable:!0,stateMutability:"payable",type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"_newKing",type:"address"},{indexed:!1,name:"_kingRansom",type:"uint256"}],name:"Coronation",type:"event"}]}},228:function(e,t,n){e.exports=n.p+"static/media/ethlogo.bdc70232.png"},232:function(e,t,n){e.exports=n(559)},237:function(e,t,n){},238:function(e,t,n){},239:function(e,t,n){},240:function(e,t,n){},241:function(e,t,n){},252:function(e,t){},287:function(e,t){},289:function(e,t){},339:function(e,t){},341:function(e,t){},372:function(e,t){},373:function(e,t){},415:function(e,t){},532:function(e,t,n){},533:function(e,t,n){},559:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),o=n(102),i=n.n(o);n(237),n(238),n(239),n(240),n(241);function s(){return c.a.createElement("div",{className:"header-container"},c.a.createElement("h1",{className:"header-title"},"King of the Dapp"))}var r=n(224),l=n(225),u=n(230),m=n(226),d=n(231),h=n(103),g=n.n(h),k=n(227),p=n(53),f=n.n(p),b=n(228),E=n.n(b);n(532);function v(e){var t=e.connectMetaMask;return c.a.createElement("div",{className:"connect-container"},c.a.createElement("p",{className:"mm-message"},"Please make sure that you are connected to the Ropsten Test Network."),c.a.createElement("button",{onClick:t},"Connect MM"),c.a.createElement("a",{className:"mm-download",target:"_blank",rel:"noopener noreferrer",href:"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"},c.a.createElement("span",null,"Download MetaMask")))}n(533);var A=n(229),w=n.n(A);function y(e){var t=e.userAccount,n=e.ethBalance,a=e.kingRansom,o=e.kingAddress,i=e.kingMe,s=e.handleInputAmountChange,r=e.kingAmount,l=w.a.createDataURL({seed:o});return c.a.createElement("div",{className:"dashboard-container"},c.a.createElement("div",{className:"user-info-container"},c.a.createElement("p",{className:"user-address"},"Your Address: ",t),c.a.createElement("p",null,"Balance: ",n," ETH")),c.a.createElement("div",{className:"king-info-container"},c.a.createElement("img",{className:"blockie-img",alt:"eth-blockie",src:l}),c.a.createElement("p",{className:"king-name"},"King: ",o),c.a.createElement("p",null,"King's Ransom: ",a," ETH")),c.a.createElement("div",{className:"input-container"},c.a.createElement("input",{className:"input-box",onChange:s,value:r,type:"number"}),c.a.createElement("button",{className:"input-btn",onClick:i},"King Me"),c.a.createElement("p",{className:"input-text"},"*Enter an amount that is at least 0.1 ETH greater.")),c.a.createElement("p",{className:"medium-link"},"Read the tutorial on Medium."))}var M=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).connectMetaMask=function(){var t=window.ethereum,n=e.state.contractAddress,a=new g.a(g.a.givenProvider||"http://localhost:8545"),c=new a.eth.Contract(k.abi,n);"3"===t.networkVersion?t.enable().then((function(t){e.setState({metamaskConnected:!0,userAccount:t[0],contract:c,web3:a}),e.checkContractInfo(),e.checkCurrentAccount(),e.checkEthBalance(t[0]),setInterval((function(){e.checkContractInfo(),e.checkEthBalance(t[0])}),25e3)})):f()({icon:"error",title:"Network Error",text:"Please switch to the Ropsten Test Network in your MetaMask extension"})},e.checkContractInfo=function(){var t=e.state,n=t.contract,a=t.web3;n.methods.King().call((function(t,n){t?console.log(t):e.setState({kingAddress:n})})),n.methods.kingRansom().call((function(t,n){if(t)console.log(t);else{var c=+a.utils.fromWei(n);e.setState({kingRansom:c.toFixed(3)})}}))},e.checkEthBalance=function(t){var n=e.state.web3;void 0!==t?n.eth.getBalance(t,(function(t,a){if(t)console.log(t);else{var c=+n.utils.fromWei(a);e.setState({ethBalance:c.toFixed(3)})}})):e.setState({metamaskConnected:!1})},e.checkCurrentAccount=function(){var t=window.ethereum;t.autoRefreshOnNetworkChange=!1,t.on("accountsChanged",(function(t){e.setState({userAccount:t[0]}),e.checkEthBalance(t[0])}))},e.kingMe=function(){var t=e.state,n=t.userAccount,a=t.kingAmount,o=t.contractAddress,i=t.web3,s=t.contract;if(+a>+t.kingRansom+.1){var r={from:n,to:o,value:i.utils.toWei(a),data:s.methods.becomeKing().encodeABI()};i.eth.sendTransaction(r).then((function(e){f()({icon:"success",title:"Tx Successfully Sent",closeOnClickOutside:!1,content:c.a.createElement("div",null,c.a.createElement("p",null,"Transaction Hash:"),c.a.createElement("p",null,c.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://ropsten.etherscan.io/tx/".concat(e.transactionHash)},e.transactionHash)))})})).catch((function(e){console.log("err",e)})),e.setState({kingAmount:0}),setTimeout((function(){return e.blockchainMessage()}),1e3)}else f()({icon:"error",title:"Incorrect Amount",text:"The amount must be at least 0.1 greater than the current kingRansom"})},e.blockchainMessage=function(){f()({closeOnClickOutside:!1,button:!1,content:c.a.createElement("div",null,c.a.createElement("img",{className:"block-load-img",src:E.a,alt:"block loading"}),c.a.createElement("p",null,"Blockchain magic in progress..."),c.a.createElement("br",null))})},e.handleInputAmountChange=function(t){e.setState({kingAmount:t.target.value.toString()})},e.state={metamaskConnected:!1,userAccount:"",ethBalance:"0",contractAddress:"0xECdAb99dBa830F3a097c3bF97139E24Bd4A214d0",kingAddress:"",kingRansom:"0",kingAmount:"0",contract:{},web3:{}},e}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.metamaskConnected,n=e.ethBalance,a=e.userAccount,o=e.kingAddress,i=e.kingRansom,s=e.kingAmount;return c.a.createElement("div",null,t?c.a.createElement("div",null,c.a.createElement(y,{handleInputAmountChange:this.handleInputAmountChange,ethBalance:n,userAccount:a,kingAddress:o,kingAmount:s,kingRansom:i,kingMe:this.kingMe})):c.a.createElement("div",null,c.a.createElement(v,{connectMetaMask:this.connectMetaMask})))}}]),t}(a.Component);var C=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("div",{className:"App-container"},c.a.createElement(s,null),c.a.createElement(M,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[232,1,2]]]);
//# sourceMappingURL=main.96101381.chunk.js.map