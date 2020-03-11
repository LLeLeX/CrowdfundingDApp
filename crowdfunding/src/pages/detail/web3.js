import Web3 from "web3";//编译器1.0的web3
const web3 = new Web3(window.web3.currentProvider);//metamask0.2的web3
export default web3;