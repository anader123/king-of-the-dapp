(this["webpackJsonpking-of-the-dapp"]=this["webpackJsonpking-of-the-dapp"]||[]).push([[0],{162:function(e,t){e.exports={abi:[{constant:!0,inputs:[],name:"King",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"kingRansom",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"becomeKing",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{inputs:[],payable:!0,stateMutability:"payable",type:"constructor"},{payable:!0,stateMutability:"payable",type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"_newKing",type:"address"},{indexed:!1,name:"_kingRansom",type:"uint256"}],name:"Coronation",type:"event"}]}},163:function(e,t,n){e.exports=n.p+"static/media/ethlogo.bdc70232.png"},167:function(e,t,n){e.exports=n(422)},172:function(e,t,n){},173:function(e,t,n){},174:function(e,t,n){},175:function(e,t,n){},186:function(e,t){},209:function(e,t){},211:function(e,t){},251:function(e,t){},253:function(e,t){},284:function(e,t){},397:function(e,t,n){},398:function(e,t,n){},422:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),o=n(76),r=n.n(o);n(172),n(173),n(174),n(175);function i(){return c.a.createElement("div",{className:"header-container"},c.a.createElement("h1",{className:"header-title"},"King of the Dapp"))}var s=n(12),l=n.n(s),u=n(56),m=n(159),d=n(160),p=n(165),h=n(161),f=n(166),g=n(77),k=n.n(g),b=n(162),v=n(29),E=n.n(v),w=n(25),A=n.n(w),y=n(163),x=n.n(y),C=function(){return A()({icon:"error",title:"Network Error",text:"Please switch to the Ropsten Test Network in your MetaMask extension"})},N=function(e){return A()({icon:"success",title:"Tx Successfully Sent",closeOnClickOutside:!1,content:c.a.createElement("div",null,c.a.createElement("p",null,"Transaction Hash:"),c.a.createElement("p",null,c.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://ropsten.etherscan.io/tx/".concat(e.transactionHash)},e.transactionHash)))})},S=function(){return A()({icon:"error",title:"Transaction Failed",text:"There was an error sending this transaciton.",button:!0})},M=function(){return A()({closeOnClickOutside:!1,button:!1,content:c.a.createElement("div",null,c.a.createElement("img",{className:"block-load-img",src:x.a,alt:"block loading"}),c.a.createElement("p",null,"Blockchain magic in progress..."),c.a.createElement("br",null))})},R=function(){return A()({icon:"error",title:"Error",text:"An error has occurred.",button:!0})},B=function(){return A()({icon:"error",title:"Ethereum Wallet Missing",text:"Please make sure that you have an Ethereum wallet installed.",button:!0})};E.a.config({DECIMAL_PLACES:4});var I=function(e){return new E.a(e).shiftedBy(-18).toString(10)};n(397);function O(e){var t=e.connectWallet;return c.a.createElement("div",{className:"connect-container"},c.a.createElement("p",{className:"mm-message"},"Please make sure that you are connected to the Ropsten Test Network."),c.a.createElement("button",{onClick:t},"Connect Wallet"),c.a.createElement("a",{className:"mm-download",target:"_blank",rel:"noopener noreferrer",href:"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"},"Download MetaMask"))}n(398);var K=n(164),T=n.n(K);function j(e){var t=e.userAccount,n=e.ethBalance,a=e.kingRansom,o=e.kingAddress,r=e.kingMe,i=e.handleInputAmountChange,s=e.kingInputAmount,l=T.a.createDataURL({seed:o});return c.a.createElement("div",{className:"dashboard-container"},c.a.createElement("div",{className:"user-info-container"},c.a.createElement("p",{className:"user-address"},"Your Address: ",t),c.a.createElement("p",null,"Balance: ",n," ETH")),c.a.createElement("div",{className:"king-info-container"},c.a.createElement("img",{className:"blockie-img",alt:"eth-blockie",src:l}),c.a.createElement("p",{className:"king-address"},"King: ",o),c.a.createElement("p",null,"King's Ransom: ",a," ETH")),c.a.createElement("div",{className:"input-container"},c.a.createElement("input",{className:"input-box",onChange:i,value:s,type:"number"}),c.a.createElement("button",{className:"input-btn",onClick:r},"King Me"),c.a.createElement("p",{className:"input-text"},"*The amount entered must be at least 0.1 ETH more than the current amount.")),c.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://medium.com/@0xnaderdev/king-of-the-dapp-an-overview-on-how-to-create-a-react-interface-for-an-ethereum-smart-contract-de53334619ea"},c.a.createElement("p",{className:"medium-link"},"Read the tutorial on Medium.")))}var W=function(e){function t(){var e;return Object(m.a)(this,t),(e=Object(p.a)(this,Object(h.a)(t).call(this))).connectWallet=Object(u.a)(l.a.mark((function t(){var n,a,c,o;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.state.contractAddress,a=new k.a(k.a.givenProvider),c=new a.eth.Contract(b.abi,n),!window.ethereum){t.next=22;break}if("3"!==window.ethereum.networkVersion){t.next=19;break}return t.prev=5,t.next=8,window.ethereum.enable();case 8:o=t.sent,e.setState({walletConnected:!0,userAccount:o[0],contract:c,web3:a}),e.methodContainer(o),t.next=17;break;case 13:t.prev=13,t.t0=t.catch(5),console.log(t.t0),R();case 17:t.next=20;break;case 19:C();case 20:t.next=23;break;case 22:B();case 23:case"end":return t.stop()}}),t,null,[[5,13]])}))),e.methodContainer=function(t){e.checkContractInfo(),e.checkCurrentAccount(),e.checkEthBalance(t[0])},e.checkContractInfo=Object(u.a)(l.a.mark((function t(){var n,a,c,o;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=e.state.contract)){t.next=20;break}return t.prev=2,t.next=5,n.methods.King().call();case 5:return a=t.sent,t.next=8,n.methods.kingRansom().call();case 8:c=t.sent,o=I(c),e.setState({kingRansom:o,kingAddress:a}),e.coronationSubscription(n),t.next=18;break;case 14:t.prev=14,t.t0=t.catch(2),console.log(t.t0),R();case 18:t.next=22;break;case 20:console.log("contract is not defined"),R();case 22:case"end":return t.stop()}}),t,null,[[2,14]])}))),e.coronationSubscription=function(t){var n=t.events.Coronation().on("data",(function(t){var n=t.returnValues._newKing,a=I(t.returnValues._kingRansom);e.setState({kingAddress:n,kingRansom:a})})).on("error",(function(e){console.log(e),R()}));e.setState({coronationSub:n})},e.checkEthBalance=function(t){var n=e.state.web3;t?n.eth.getBalance(t,(function(t,n){if(t)console.log(t),R();else{var a=I(n);e.setState({ethBalance:a})}})):e.setState({walletConnected:!1})},e.checkCurrentAccount=function(){var t=window.ethereum;t.autoRefreshOnNetworkChange=!1,t.on("accountsChanged",(function(t){e.setState({userAccount:t[0]}),e.checkEthBalance(t[0])}))},e.kingMe=Object(u.a)(l.a.mark((function t(){var n,a,c,o,r,i,s,u;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.state,a=n.userAccount,c=n.kingInputAmount,o=n.web3,r=n.contract,i=n.kingRansom,s=new E.a(i),new E.a(c)>=s+.1?(u=o.utils.toWei(c),r.methods.becomeKing().send({from:a,value:u}).on("receipt",(function(t){e.checkEthBalance(a),N(t)})).on("error",(function(e){console.log(e),R()})),e.setState({kingInputAmount:0}),M()):S();case 4:case"end":return t.stop()}}),t)}))),e.handleInputAmountChange=function(t){e.setState({kingInputAmount:t.target.value.toString()})},e.state={walletConnected:!1,userAccount:null,ethBalance:null,contractAddress:"0x2800cC9F11E0956B20FE48FcC8b69db310D93f02",kingAddress:null,kingRansom:null,kingInputAmount:"",contract:{},web3:{},coronationSub:null},e}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentWillUnmount",value:function(){var e=this.state.coronationSub;e&&e.unsubcribe()}},{key:"render",value:function(){var e=this.state,t=e.walletConnected,n=e.ethBalance,a=e.userAccount,o=e.kingAddress,r=e.kingRansom,i=e.kingInputAmount;return c.a.createElement("div",null,t?c.a.createElement("div",null,c.a.createElement(j,{handleInputAmountChange:this.handleInputAmountChange,ethBalance:n,userAccount:a,kingAddress:o,kingInputAmount:i,kingRansom:r,kingMe:this.kingMe})):c.a.createElement("div",null,c.a.createElement(O,{connectWallet:this.connectWallet})))}}]),t}(a.Component);var _=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("div",{className:"App-container"},c.a.createElement(i,null),c.a.createElement(W,null)))};r.a.render(c.a.createElement(_,null),document.getElementById("root"))}},[[167,1,2]]]);
//# sourceMappingURL=main.b5014b60.chunk.js.map