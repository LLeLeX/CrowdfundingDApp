const Web3 = require('web3');
const {interface, bytecode} = require('./compileFactory');
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'impulse excuse alley unfold bullet steel loop game skull leader library bleak'; // 12 words mnemonic（metamask）
let provider = new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/fbe2aa5a28b04d8f9fc4966b90a267c5');
const web3 = new Web3(provider);//类似电话卡
//定义deploy函数
deploy =async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    //使用result接收智能合约部署在网络上之后返回的json对象
    let result = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data:bytecode,//部署的真实数据通过二进制代码部署
    }).send({
        from:accounts[0],
        gas:'1000000'//！！！！！部署在真实网络要用引号引起来
    });
    console.log('-------------------------');
    console.log('-------------------------');
    console.log('accounts0:' + accounts[0]);//部署者的地址
    console.log('address:' + result.options.address);//合约地址
    console.log('-------------------------');
    console.log('interface:' + interface);//合约abi,写在此处格式不需要调整
};

deploy();//调用函数