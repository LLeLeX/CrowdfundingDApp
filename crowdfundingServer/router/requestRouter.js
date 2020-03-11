const express = require('express');
const router = express.Router();
const mydb =  require('../database');//导入数据库的链接

router.get('/search', (req, res)=>{
    let sqlQuery = 'select * from `requestinfo` where requestContract=? ';
    mydb.query(sqlQuery, req.query.requestContract, function (err, rows, fields) {
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

router.post('/updateCount',(req, res)=>{
    let data = req.body;
    console.log(req.body);

    let sqlQuery = 'UPDATE `requestinfo` SET requestCount=? WHERE (requestID=?) AND (requestContract=?)';
    let sqlParams = [data.requestCount, data.requestID, data.requestContract];
    mydb.query(sqlQuery, sqlParams, function (err, result, fields) {
        if (err)
            throw err;
        else
            res.send('success');
            return result;
    });
});

router.post('/updateCmplt',(req, res)=>{
    let data = req.body;
    console.log(req.body);
    let sqlQuery = 'UPDATE `requestinfo` SET requestComplete=? WHERE (requestID=?) AND (requestContract=?)';
    let sqlParams = [data.requestComplete, data.requestID, data.requestContract];
    mydb.query(sqlQuery, sqlParams, function (err, result, fields) {
        if (err)
            throw err;
        else
            res.send('success');
            return result;
    });
});

router.post('/add',(req, res)=>{
    let data = req.body;
    console.log(req.body);
    res.send('success');
    let sqlQuery = 'INSERT INTO `requestinfo`(requestID, requestMoney, requestDescribe, requestAddress, requestCount, requestComplete, requestContract) VALUES(?,?,?,?,?,?,?)';
    let sqlParams = [data.requestID, data.requestMoney, data.requestDescribe, data.requestAddress, data.requestCount, data.requestComplete, data.requestContract];
    mydb.query(sqlQuery, sqlParams, function (err, result, fields) {
        if (err)
            throw err;
        return result;
    });
});
module.exports = router;