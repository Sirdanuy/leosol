//everlight lib

var EL = {
    // init
    // return address
    web3init : function () {
        if (typeof window.ethereum !== 'undefined') {
            web3js = new Web3(window.ethereum);
            return new Promise(function (resolve, reject) {
                try {
                    window.ethereum.request({ method: 'eth_requestAccounts' })
                        .then(function (result) {  
                            this.currentAccount = result;
                            resolve(result);
                        }).catch((err) => {
                            reject(err);
                        });
                } catch (err) {
                    reject(err);
                }
            });
        } else {
            return new Promise(function (resolve, reject) {
                console.log("error not found matamask");
                reject(new Error('NotFoundMatamask'));
            });
        }
    },
    //ChainChanged
    handleChainChanged:function (_chainId) {
        // We recommend reloading the page, unless you must do otherwise
        console.log("chain changed:" + _chainId);
        window.location.reload();
    },
    //AddressChanged
    handleAccountsChanged:function (accounts) {
        console.log("currentAccount:" + currentAccount);
        console.log("accounts[0]:" + accounts[0]);
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        }else if (currentAccount==''){
            currentAccount = accounts[0];
            console.log('Account approved: '+currentAccount);
        } else if (accounts[0] !== currentAccount) {
            console.log('Account changed.');
            window.location.reload();
            // Do any other work!
        }
    },
    connect : function () {
        if (typeof window.ethereum !== 'undefined') {
            isTestnet = true;
            web3js = new Web3(window.ethereum);
            currentAccount = '';

            web3js.currentProvider.on('accountsChanged', this.handleAccountsChanged);
            web3js.currentProvider.on('chainChanged', this.handleChainChanged);

            // // '0x1' Ethereum Main Network , 
            // // '0x13881' testnet
            // web3js.currentProvider.chainId == '0x1' 

            return new Promise(function (resolve, reject) {
                try {
                    window.ethereum
                    .request({ method: 'eth_requestAccounts' })
                    .then(function (result) {
                        var network = "0";
                        network = web3js.currentProvider.networkVersion;
                        var params;
                        if (isTestnet == false) {
                            if (network == "137") {
                                // alert("Polygon Network has already been added to Metamask.");
                                currentAccount = result;
                                //web3js.eth.getGasPrice()
                                        //.then((ggp) => {
                                            //gasPrice = ggp;
                                            //console.log(ggp);
                                            //gas = null;
                                        //})
                                resolve(result);
                            } else {
                                params = [{
                                    chainId: '0x1',
                                    chainName: 'Ethereum Mainnet',
                                    nativeCurrency: {
                                        name: 'ETH',
                                        symbol: 'ETH',
                                        decimals: 18
                                    },
                                    rpcUrls: ['https://mainnet.infura.io/v3/'],
                                    blockExplorerUrls: ['https://etherscan.io']
                                }]
                                window.ethereum.request({ method: 'wallet_addEthereumChain', params })
                                .then((res) => {
                                    if(res!=null){
                                        console.log('Success: '+res);
                                        //web3js.eth.getGasPrice()
                                        //.then((ggp) => {
                                            //gasPrice = ggp;
                                            //gas = null;
                                        //})
                                    }else{
                                        reject(new Error('PleaseChangeNetwork'));
                                    }
                                })
                                .catch((error) => reject(error));
                            }
                        } else {
                            if (network == "1") {
                                // alert("Polygon Mumbai Network has already been added to Metamask.");
                                currentAccount = result;
                                //web3js.eth.getGasPrice()
                                        //.then((ggp) => {
                                            //gasPrice = ggp;
                                            //console.log(ggp);
                                            //gas = null;
                                        //})
                                resolve(result);
                            } else {
                                params = [{
                                    chainId: '0x13881',
                                    chainName: 'Polygon Testnet',
                                    nativeCurrency: {
                                        name: 'MATIC',
                                        symbol: 'MATIC',
                                        decimals: 18
                                    },
                                    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                                    blockExplorerUrls: ['https://mumbai.polygonscan.com/']
                                }]
                                window.ethereum.request({ method: 'wallet_addEthereumChain', params })
                                .then((res) => {
                                    if(res!=null){
                                        console.log('Success: '+res);
                                        //web3js.eth.getGasPrice()
                                        //.then((ggp) => {
                                            //gasPrice = ggp;
                                            //gas = null;
                                        //})
                                    }else{
                                        reject(new Error('PleaseChangeNetwork'));
                                    }
                                })
                                .catch((error) => reject(error));
                            }
                        }



                        // if (network != '0x13881'){
                        //     reject(new Error('PleaseChangeNetwork'));
                        // }else{
                        //     currentAccount = result;
                        //     resolve(result);
                        // }
                    })
                    .catch((err) => {
                      if (err.code === 4001) {
                        // EIP-1193 userRejectedRequest error
                        // If this happens, the user rejected the connection request.
                        console.log('Please connect to MetaMask.');
                      } else {
                        console.error(err);
                      }
                      reject(err);
                    });
                    // window.ethereum.request({ method: 'eth_requestAccounts' })
                    //     .then(function (result) {  
                    //         console.log(this.currentAccount);
                    //         resolve(result);
                    //     }).catch((err) => {
                    //         reject(err);
                    //     });
                } catch (err) {
                    reject(err);
                }
            });
        } else {
            return new Promise(function (resolve, reject) {
                console.log("error not found matamask");
                reject(new Error('NotFoundMatamask'));
            });
        }
    },
}
