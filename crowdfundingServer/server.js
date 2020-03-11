const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(cors());

const bodyParser = require('body-parser');//与req.body解析有关
//当post传参，解析req.body，数据格式分别为表单与json格式
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//静态目录，可以被外网访问的文件目录
//http请求访问http://localhost:4000/public/images/...
//声明当前目录下uploads文件夹为静态目录
app.use('/public', express.static(path.join(__dirname, './uploads')));

//导入路由
let contractRouter = require('./router/contractRouter');
let fileRouter = require('./router/fileRouter');
let requestRouter = require('./router/requestRouter');
let recordRouter = require('./router/recordRouter');

//调用路由内的函数
app.use('/contract', contractRouter);//访问http://localhost:4000/contract/search
app.use('/file', fileRouter);
app.use('/request', requestRouter);
app.use('/record', recordRouter);
//监听4000端口，开启服务器
app.listen(4000, function () {
   console.log('listening port 4000...') ;
});