import React from "react";
import web3 from "../detail/web3";
import { Button, Form, TextArea, Image } from 'semantic-ui-react';
const $ = require('jquery');

const http = require('http');
const querystring = require('querystring');
//合约工厂地址
/*const addrFactory = "0x4DD9f4D521fB837C60a201facf6f75bd91E0b95b";
const abiFactory = [{"constant":false,"inputs":[{"name":"_projectName","type":"string"},{"name":"_supporMoney","type":"uint256"},{"name":"_goalMoney","type":"uint256"}],"name":"deploy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addrmanager","type":"address"}],"name":"getAddrfundings","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
const factory = new web3.eth.Contract(abiFactory, addrFactory);*/
const addrFactory = "0x9666Bd52891D4111E634936c57160a7CAFE916e7";
const abiFactory = [{"constant": false, "inputs": [{"name": "_projectName", "type": "string"}, {"name": "_supporMoney", "type": "uint256"}, {"name": "_goalMoney", "type": "uint256"}], "name": "deploy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "getAddr", "outputs": [{"name": "", "type": "address"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "numFundings", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}];
const factory = new web3.eth.Contract(abiFactory, addrFactory);

export default class UserPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            addrContract:"0x132654",
            addrManager:"0x987613165",
            projectName:"",
            totalMoney:"",
            supportMoney:"",
            desContract:"",
            imagePath:"",
            list:[],
        }
    }
    //practice:发表评论
    postComment=()=>{
      let cmtInfo = {user:this.refs.inputUser.value, content:this.refs.inputContent.value};
      let list = JSON.parse(localStorage.getItem('cmts')||'[]');
      list.unshift(cmtInfo);
      localStorage.setItem('cmts', JSON.stringify(list));
      this.refs.inputUser.value = this.refs.inputContent.value = '';
      window.location.reload(true);//刷新页面
    };
    //practice:加载评论
    loadComments=()=>{
      let list = JSON.parse(localStorage.getItem('cmts')||'[]');
      this.setState({list});
    };
    //*******************与项目发布有关*********************
    //获取项目名称,总金额，单次金额，项目描述
    handleNameChange=(e)=>{
        this.setState({projectName:e.target.value});
    };
    handleTotalChange=(e)=>{
        this.setState({totalMoney:e.target.value});
    };
    handleSingleChange=(e)=>{
        this.setState({supportMoney:e.target.value});
    };
    handleDesChange=(e)=>{
        this.setState({desContract:e.target.value});
    };

    //利用factory工厂，点击发布项目
    publishProject= async ()=>{
        //智能合约部署
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        console.log(this.state.projectName);
        console.log(this.state.totalMoney);
        console.log(this.state.supportMoney);
        await factory.methods.deploy(this.state.projectName, parseInt(this.state.supportMoney), parseInt(this.state.totalMoney),)
            .send({
                from: accounts[0],
            });
        this.setState({loading:false});
        console.log('publishing success');
        const addr = await factory.methods.getAddr().call();//拿到新部署的智能合约地址
        console.log('addrTemp:',addr);
        await this.setState({addrContract:addr, addrManager:accounts[0]});//赋值合约地址和发布者地址
        console.log("addrContract:" + this.state.addrContract);

        //添加至数据库
        await this.addContracts();
    };
    //将发布的项目插入数据库
    addContracts =()=>{
        let post_data = {
            addrContract: this.state.addrContract,
            addrManager: this.state.addrManager,
            projectName: this.state.projectName,
            supportMoney: this.state.supportMoney,
            totalMoney: this.state.totalMoney,
            desContract: this.state.desContract,
            imagePath: this.state.imagePath,
        };//这是需要提交的数据
        console.log('向服务器发送数据：' + post_data);
        let content = querystring.stringify(post_data);
        let options = {
            hostname: '127.0.0.1',
            port: 4000,
            path: '/contract/add',
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
    };

    uploadImage =async ()=>{
        let file = $('#fileinput').get(0).files[0];//获取图片
        console.log(file);
        let formData = new FormData();
        formData.append('upImage', file);
        await $.ajax ({
            url:'http://localhost:4000/file/upload',
            type:'POST',
            cache:false,//不必须
            data:formData,
            processData:false,//必须
            contentType:false,//必须
            success: await function (data)
            {
                if(data.err === 0)
                {
                    let tempPath = `http://localhost:4000${data.url}`;
                    $('#uploadImage').attr('src', tempPath);
                    localStorage.setItem('path', tempPath);
                    console.log('joint path:' + tempPath);
                    console.log('LocalStorage path:' + localStorage.getItem('path'));
                }
                else
                {
                    alert('图片上传失败');
                }
            }
        });
        this.setState({imagePath: localStorage.getItem('path')});
        console.log('this.state.imagePath:' + this.state.imagePath);
    };
    componentWillMount() {
        this.loadComments();
    }

    render() {
        return(
            <div>
                UserPage
                <h1>评论组件练习</h1>

                <div>
                    <label>评论人：</label><br/>
                    <input type="text" ref="inputUser"/><br/>
                    <label>评论内容：</label><br/>
                    <textarea cols="30" rows="4" ref="inputContent"/><br/>
                    <input type="button" value="发表评论" onClick={this.postComment}/>
                </div>
                <hr/>
                {this.state.list.map((item, i)=>{
                    return <div key={i} style={{border:'1px solid #ccc', margin:'10px 0'}}>
                        <h3>评论人：{item.user}</h3>
                        <h5>评论内容：{item.content}</h5>
                    </div>
                })}


                <br/>
                <Form style={{width:'90%', border:'1px solid #ccc', margin:'auto'}}>
                    <h1>项目发表</h1>
                    <Form.Group>
                        <Form.Input id="projectName" label='项目名称' placeholder='项目名称' value={this.state.projectName} onChange={this.handleNameChange}/>
                        <Form.Input id="totalMoney" label='筹资总金额' placeholder='筹资总金额' width={3} value={this.state.totalMoney} onChange={this.handleTotalChange}/>
                        <Form.Input id="supportMoney" label='单次投资金额' placeholder='单次投资金额' width={3} value={this.state.supportMoney} onChange={this.handleSingleChange}/>
                    </Form.Group>
                    <Form.Field control={TextArea} label='项目描述' placeholder='Tell us more about the project...' value={this.state.desContract} onChange={this.handleDesChange}/>

                    {/*关于上传图片*/}
                    <div style={{marginTop:'2%'}}>
                        <Image id="uploadImage" src='/images/uploadImage.png' size='medium' />
                        <br/>
                        <input type="file" id="fileinput"/>
                        <Button secondary onClick={this.uploadImage}>上传</Button>
                    </div>

                    <Form.Checkbox label='I agree to the Terms and Conditions' style={{marginTop:"1%"}}/>
                    <Button type='submit' onClick={this.publishProject}>提交</Button>
                    <br/>

                </Form>
            </div>
        )
    }
}