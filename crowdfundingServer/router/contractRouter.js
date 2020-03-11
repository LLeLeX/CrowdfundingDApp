let express = require('express');
const app = express();
let router = express.Router();
const bodyParser = require('body-parser');//与req.body解析有关
const mydb =  require('../database');//导入数据库的链接

//当post传参，解析req.body，数据格式分别为表单与json格式
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//链接数据库
//此为最简单的api接口
//查询合约列表
router.get('/search', function(req, res) {
  let sqlQuery = 'SELECT * FROM `contractinfo`';
  mydb.query(sqlQuery, function (err, rows, fields) {
    if(err)
    {
      console.log(err);
      return;
    }
    else
    {
      return res.json({data:rows});
    }
  });
});

//插入合约
router.post('/add', (req, res)=>{
  console.log('-------------------添加api--------------------');
  let data = req.body;
  console.log(req.body);
  res.send('success');
  let sqlQuery = 'INSERT INTO `contractinfo`(addrContract, addrManager, projectName, totalMoney, supportMoney, desContract, imagePath) VALUES(?,?,?,?,?,?,?)';
  let sqlParams = [data.addrContract, data.addrManager, data.projectName, data.totalMoney, data.supportMoney, data.desContract, data.imagePath];
  mydb.query(sqlQuery, sqlParams, function (err, result, fields) {
    if (err)
    {
      throw err;
      return;
    }
    else
    {
      return result;
    }

  });
});

module.exports = router;
