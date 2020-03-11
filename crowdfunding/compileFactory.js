const path = require('path');
const fs = require('fs');
const solc = require('solc');
const srcpath = path.resolve(__dirname, 'contracts', "Funding.sol");//智能合约的路径
const source = fs.readFileSync(srcpath, 'utf-8');//读取文件
const result = solc.compile(source, 1);//json对象，可以看到智能合约的bytecode，汇编代码，interface
//console.log(result);//我们关心的只有bytecode与interface
module.exports = result.contracts[':FundingFactory'];//导出（暴露出）Funding智能合约的内容