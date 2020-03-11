import React from 'react';
import {Card, Image, Statistic, Button, Label, Icon, Progress, Form} from 'semantic-ui-react';
import web3 from "./web3";
import  "./DetailPage.css";
const $ = require('jquery');
const httpRequest = require('request');
const http = require('http');
const querystring = require('querystring');
//合约工厂地址
/*const addrFactory = "0x4DD9f4D521fB837C60a201facf6f75bd91E0b95b";
const abiFactory = [{"constant":false,"inputs":[{"name":"_projectName","type":"string"},{"name":"_supporMoney","type":"uint256"},{"name":"_goalMoney","type":"uint256"}],"name":"deploy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addrmanager","type":"address"}],"name":"getAddrfundings","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
const factory = new web3.eth.Contract(abiFactory, addrFactory);*/
//根据msg.sender可以找到相应的合约
//根据获取到相应的智能合约--此处不是全局变量，只能在这里获取，在support中不能使用，而且此时还是得先知道数组下标才行
//合约地址
let addrFunding = "0x1C124F45374E3EAac51C5Ad2906FF0E1d7bFfb84";
//let abiFunding = [{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"finalizeRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"support","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSupportMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"supporters","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"requestArray","outputs":[{"name":"id","type":"uint256"},{"name":"description","type":"string"},{"name":"money","type":"uint256"},{"name":"shopAddress","type":"address"},{"name":"complete","type":"bool"},{"name":"voteCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSecTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_description","type":"string"},{"name":"_money","type":"uint256"},{"name":"_shopaddress","type":"address"}],"name":"createRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"requestID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"projectName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"goalMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getProjectName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"supportMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPlayersCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getDayTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getStruct","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"approveRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayersAddress","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getGoalMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_projectName","type":"string"},{"name":"_supporMoney","type":"uint256"},{"name":"_goalMoney","type":"uint256"},{"name":"_address","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
let abiFunding = [{"constant": false, "inputs": [{"name": "index", "type": "uint256"}], "name": "finalizeRequest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [], "name": "support", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function"}, {"constant": true, "inputs": [], "name": "getTotalBalance", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getSupportMoney", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "endTime", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "", "type": "uint256"}], "name": "supporters", "outputs": [{"name": "", "type": "address"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "manager", "outputs": [{"name": "", "type": "address"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "index", "type": "uint256"}], "name": "getStructByID", "outputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "string"}, {"name": "", "type": "uint256"}, {"name": "", "type": "address"}, {"name": "", "type": "bool"}, {"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getSecTime", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_description", "type": "string"}, {"name": "_money", "type": "uint256"}, {"name": "_shopaddress", "type": "address"}], "name": "createRequest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "requestID", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "projectName", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "goalMoney", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getProjectName", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "supportMoney", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getPlayersCount", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getDayTime", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getCurStruct", "outputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "string"}, {"name": "", "type": "uint256"}, {"name": "", "type": "address"}, {"name": "", "type": "bool"}, {"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getRequestID", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getManager", "outputs": [{"name": "", "type": "address"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "index", "type": "uint256"}], "name": "approveRequest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "getPlayersAddress", "outputs": [{"name": "", "type": "address[]"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getGoalMoney", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"inputs": [{"name": "_projectName", "type": "string"}, {"name": "_supporMoney", "type": "uint256"}, {"name": "_goalMoney", "type": "uint256"}, {"name": "_address", "type": "address"}], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}];
let funding = new web3.eth.Contract(abiFunding, addrFunding);

export default class DetailPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addrFunding:props.location.state.addr,
            imagePath:props.location.state.imagePath,

            manager:'',
            playerCount:0,
            balance:0,
            supportMoney:0,
            goalMoney:0,
            projectName:" ",
            loading:false,//按钮加载状态
            showButton:'none',//退款按钮显示状态
            day:0,
            hour:0,
            minute:0,
            second:0,
            transCount:0,

            //记录功能&付款请求
            dbRecords:[],//付款记录
            dbRequests:[],
            requestDescribe:'',
            requestID:0,
            requestMoney:0,
            requestAddress:'',
            requestComplete:'',
            requestCount:0,

        };
    }

    async componentDidMount(){
        //**********与路由传参有关*************
        console.log("路由页面显式传参：" + this.props.match.params.addr);//可以在地址栏路由传递参数（显式页面传参）
        console.log("页面隐式传参：" + this.props.location.state.addr);//隐式页面传参
        //**********获取智能合约参数*************
        funding = await new web3.eth.Contract(abiFunding, this.state.addrFunding);
        const accounts = await web3.eth.getAccounts();
        const _address = await funding.methods.getManager().call();
        this.setState({manager:_address});
        const _playerCount = await funding.methods.getPlayersCount().call();
        this.setState({playerCount:_playerCount});
        const _balance = await funding.methods.getTotalBalance().call();
        this.setState({balance:_balance});
        const _supportMoney = await funding.methods.getSupportMoney().call();
        this.setState({supportMoney:_supportMoney});
        const _endTime = await funding.methods.getDayTime().call();
        this.setState({day:_endTime});//天数
        const _goalMoney = await funding.methods.getGoalMoney().call();
        this.setState({goalMoney:_goalMoney});
        const _projectName = await funding.methods.getProjectName().call();
        this.setState({projectName:_projectName});
        //调用倒计时
        const _sec = await funding.methods.getSecTime().call();
        this.getTimer(_sec);
        if(accounts[0] === _address)//退款按钮显示
            this.setState({showButton:'inline'});
        else
            this.setState({showButton:'none'});

        //***************与查看交易信息有关*************
        const _transCount = await web3.eth.getTransactionCount("0xCCa3963319dc550D140e2d7e4dcb21806205569B");//获取这个账户的交易数量
        this.setState({transCount:_transCount});
        const _transInfo = await web3.eth.getTransaction("0xf7c0072f9068ac84ad01990707693a9e002317e70e85146be46ce597144b9620");//参数为交易地址
        console.log("获取交易地址TRANSCATIONInfo:"+_transInfo.hash);//获取交易地址
        const _transCode = await web3.eth.getBlockNumber();//最新区块
        console.log("LatestBlock:"+_transCode);//获取交易地址
        console.log("metaMask:" + window.ethereum.selectedAddress);
        this.getAllRecord();

        //****************与request struct有关*****************
        this.getRequest();
        console.log("dbRequest：", this.state.dbRequests);
        const tempRequest = await funding.methods.getCurStruct().call();
        this.setState({requestID:tempRequest[0]});
        this.setState({requestDes:tempRequest[1]});
        this.setState({requestMoney:tempRequest[2]});
        this.setState({requestAddr:tempRequest[3]});
        if(tempRequest[4] === false)
            this.setState({requestCmplt:'此付款请求尚未执行'});
        else
            this.setState({requestCmplt:'此付款请求已执行成功'});
        this.setState({requestCnt:tempRequest[5]});

    }
    componentWillUnmount(){
        this.setState = (state, callback)=>{
            return;
        };
    }
    //设置倒计时finished
    getTimer = (remain)=>{
        this.timer = setInterval( () => {
            if(remain > 1)
            {
                remain -= 1;
                let dd = Math.floor((remain / 3600) / 24);
                let hh = Math.floor((remain / 1000 / 60) % 24);
                let mm = Math.floor((remain / 60) % 60);
                let ss = Math.floor(remain % 60);
                this.setState({
                    day:dd,
                    hour:hh < 10 ? "0" + hh : hh,
                    minute:mm < 10 ? "0" + mm : mm,
                    second:ss < 10 ? "0" + ss : ss
                })
            }
            else
            {
                this.setState({
                    day:"00",
                    hour:"00",
                    minute:"00",
                    second:"00"
                })
            }
        }, 1000);
    };
    //获取support投资函数
    support = async ()=>{
        this.setState({loading:true});
        const accounts = await web3.eth.getAccounts();
        const sMoney = await funding.methods.getSupportMoney().call();
        await funding.methods.support().send({
            from: accounts[0],
            value: sMoney//等于supportMoney
        });
        console.log('Support Successed');
        await this.addRecord();
        this.setState({loading:false});
        window.location.reload(true);
    };
//************获取记录************调用外部api
    addRecord=async ()=>{
        const accounts = await web3.eth.getAccounts();
        console.log('accounts',accounts[0]);
        let url = await `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${accounts[0]}&startblock=0&endblock=99999999&sort=desc&apikey=ISZNWDZKPBAB9ZFXNA31DXGBBNM9TE4QIG`;
        console.log('url', url);
        await httpRequest (url, function(err, res, data)
        {
            console.log("1");
            let tempTime = new Date().toLocaleString( `default`, {
                day    : `2-digit`,
                hour   : `2-digit`,
                hour12 : false,
                minute : `2-digit`,
                month  : `2-digit`,
                second : `2-digit`,
                year   : `numeric`,
            }).replace( /[^\d\s\u003a]/gu, `\u002d` );//获取当前标准时间
            console.log(tempTime);
            console.log('交易data',data);
            console.log('交易data-JSON',JSON.parse(data));
            if(!err && res.statusCode === 200)
            {
                console.log("2");
                let rcd = JSON.parse(data);//转化为json
                console.log("交易区块高度：" + rcd.result[0].blockNumber);//拿到交易区块地址
                console.log("交易去向：" + rcd.result[0].to);
                let obj = {recordHash:rcd.result[0].hash, recordFrom:rcd.result[0].from, recordBlockNumber:rcd.result[0].blockNumber, recordTo:rcd.result[0].to};
                console.log('获取交易信息：', obj);
                let post_data = {
                    recordHash: rcd.result[0].hash,
                    recordFrom: rcd.result[0].from,
                    recordBlockNumber: rcd.result[0].blockNumber,
                    recordTo: rcd.result[0].to,
                    recordTime: tempTime.toString()
                };//这是需要提交的数据
                console.log('向服务器发送数据：' + post_data);
                let content = querystring.stringify(post_data);
                let options = {
                    hostname: '127.0.0.1',
                    port: 4000,
                    path: '/record/add',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                };
                let req = http.request(options, function (res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        console.log('BODY: ' + chunk);
                    });
                });
                req.on('error', function (e) {
                    console.log('problem with request: ' + e.message);
                });
                req.write(content);// write data to request body
                req.end();
            }
            else{
                alert('获取记录错误');
            }
        });
    };
    getAllRecord=()=>{
        let url = `http://localhost:4000/record/search?recordTo=${this.state.addrFunding}`;
        console.log('url:',url);
        fetch(url)
            .then(response => response.json())
            .then(response => (this.setState({dbRecords:response.data})))
            .catch(err => console.error(err));
    };


//********************关于付款请求*********************
    publishRequest = async ()=>{
        console.log("********************关于付款请求发布*********************");
        const accounts = await web3.eth.getAccounts();
        console.log('account:', accounts[0]);
        let reMoney = await $('#requestMoney').get(0).value;
        console.log('获取组件：', reMoney);
        let reAddress = await $('#requestAddress').get(0).value;
        let reDescribe = await $('#requestDescribe').get(0).value;
        console.log('获取组件：', reAddress);
        console.log('获取组件：', reDescribe);

        await funding.methods.createRequest(reDescribe, reMoney, reAddress)
            .send({
                from:accounts[0],
            });
        console.log('payment published success');

        const curRequest = await funding.methods.getCurStruct().call();
        console.log('当前付款请求getCurStruct：',curRequest);
        let cmplt;
        if(curRequest[4] === false)
            cmplt = "此付款请求尚未执行";
        else
            cmplt = "此付款请求已执行成功";
        //插入数据库
        let post_data = {
            requestID: curRequest[0],
            requestDescribe: curRequest[1],
            requestMoney: curRequest[2],
            requestAddress: curRequest[3],
            requestComplete: cmplt,
            requestCount: curRequest[5],
            requestContract: this.state.addrFunding,
        };//这是需要提交的数据
        console.log('向服务器发送数据：' + post_data);
        let content = await querystring.stringify(post_data);
        let options = {
            hostname: '127.0.0.1',
            port: 4000,
            path: '/request/add',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
        let req = await http.request(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });
        req.write(content);// write data to request body
        req.end();


        let curID = await funding.methods.getRequestID().call();
        console.log('当前ID:',curID);
        const curRequest2 = await funding.methods.getStructByID(curID).call();
        console.log('当前付款请求getStructByID：',curRequest2);
    };

    //赞同付款请求
    approveRequest = async ()=>{
        const accounts = await web3.eth.getAccounts();
        let reID = await $('#requestID').get(0).value;
        await funding.methods.approveRequest(reID)
            .send({
                from:accounts[0],
            });
        let tempRequest = await funding.methods.getStructByID(reID).call();
        let obj = {
          requestID:reID,
          requestCount: tempRequest[5],
          requestContract: this.state.addrFunding
        };
        console.log('obj',obj);
        await $.ajax ({
            url:'http://localhost:4000/request/updateCount',
            type:'POST',
            data: obj,
            success: await function ()
            {
                alert("该付款请求投票成功");
            }
        });
    };
    //执行付款请求
    executeRequest = async ()=>{
        const accounts = await web3.eth.getAccounts();
        let reID = await $('#requestID').get(0).value;
        await funding.methods.finalizeRequest(reID)
            .send({
                from:accounts[0],
            });
        let obj ={
          requestID:reID,
          requestComplete:"此付款请求已执行成功",
          requestContract:this.state.addrFunding,
        };
        await $.ajax ({
            url:'http://localhost:4000/request/updateCmplt',
            type:'POST',
            data: obj,
            success: await function ()
            {
                alert("该付款请求执行成功");
            }
        });
    };
    //获取付款请求
    getRequest =()=>{
        let url = `http://localhost:4000/request/search?requestContract=${this.state.addrFunding}`;
        fetch(url)
            .then(response => response.json())
            .then(response => (this.setState({dbRequests:response.data})))
            .catch(err => console.error(err));
    };

    //主页面显示
    render() {
        return (
            <div>
                {/*-----------------cards & database----------------------*/}
                <div className={"boxCard"}>
                    <Card>
                        <Image src={this.state.imagePath} wrapped ui={false}/>
                        <Card.Content>
                            <Card.Header>项目名称：{this.state.projectName}</Card.Header>
                            <Card.Meta>
                                <span className='date'>发起人地址信息：</span>
                                <Label size={'mini'}>{this.state.manager}</Label>
                            </Card.Meta>
                            <Card.Description>
                                每次可投资{this.state.supportMoney}wei
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='money bill alternate'/>
                            目标筹集：{this.state.goalMoney}wei
                            <br/>
                            <Icon name='clock'/>
                            还剩{this.state.day}天{this.state.hour}时{this.state.minute}分{this.state.second}秒
                            <br/>
                            <Icon name='user'/>
                            {this.state.playerCount}人已经投资成功
                        </Card.Content>
                        <Card.Content extra>
                            <Statistic color='red'>
                                <Statistic.Value>{this.state.balance} wei</Statistic.Value>
                            </Statistic>
                            <Progress percent={(this.state.balance / this.state.goalMoney * 100).toFixed(2)} inverted progress success/>
                        </Card.Content>
                        <Button inverted color='pink' onClick={this.support} loading={this.state.loading} disabled={this.state.loading}>
                            我要投资
                        </Button>
                        <Button inverted color='pink' style={{display:this.state.showButton}}>
                            退款
                        </Button>
                    </Card>
                </div>

                <div className="browseMoneyBox">
                    <h3>资金去向</h3>
                    {this.state.dbRecords.map(dbRecords =>
                        <div className="recordBox" key={dbRecords.recordHash}>
                            <Icon name='tag'/>
                            交易区块高度：{dbRecords.recordBlockNumber}
                            <br/>
                            <Icon name='bars'/>
                            交易区块Hash：<Label size={'mini'}>{dbRecords.recordHash}</Label>
                            <br/>
                            <Icon name='bars'/>
                            交易投资人地址：<Label size={'mini'}>{dbRecords.recordFrom}</Label>
                            <br/>
                            <Icon name='check'/>
                            交易去向：<Label size={'mini'}>{dbRecords.recordTo}</Label>
                            <br/>
                            <Icon name='time'/>
                            交易时间：<Label size={'mini'}>{dbRecords.recordTime}</Label>
                            <hr/>
                        </div>
                    )}
                    <br/>
                </div>

                <div className="requestInfo">
                    <h3>付款请求信息</h3>
                    {this.state.dbRequests.map(dbRequests =>
                        <div className="requestInfoBox" key={dbRequests.requestID}>
                            <Icon name='tag'/>
                            付款请求ID：{dbRequests.requestID}
                            <br/>
                            <Icon name='check'/>
                            付款完成情况：{dbRequests.requestComplete}
                            <br/>
                            <Icon name='bars'/>
                            付款请求描述：{dbRequests.requestDescribe}
                            <br/>
                            <Icon name='home'/>
                            付款地址：<Label size={'mini'}>{dbRequests.requestAddress}</Label>
                            <br/>
                            <Icon name='money'/>
                            付款金额:{dbRequests.requestMoney}
                            <br/>
                            <Icon name='thumbs up outline'/>
                            投票人数：{dbRequests.requestCount}
                            <hr/>
                        </div>
                    )}
                    <br/>
                    <Form.Input id="requestID" fluid label='付款请求ID' placeholder='填入付款请求ID,点击赞同按钮' />
                    <br/>
                    <Button inverted color='violet' onClick={this.approveRequest}>赞同</Button>
                    <Button inverted color='blue' onClick={this.executeRequest} style={{display:this.state.showButton}}>
                        执行付款请求
                    </Button>
                </div>


                <div className="requestBox">
                    <h3>付款请求</h3>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input id="requestMoney" fluid label='付款请求金额' placeholder='付款请求金额' />
                            <Form.Input id="requestAddress" fluid label='转账地址' placeholder='转账地址' />
                        </Form.Group>
                        <Form.TextArea id="requestDescribe" label='付款请求描述' placeholder='Tell us more about you...' />
                        <Form.Checkbox label='I agree to the Terms and Conditions' />
                        <Button inverted color='orange' onClick={this.publishRequest}>提交付款请求</Button>
                    </Form>
                </div>
            </div>
        );


    }
}