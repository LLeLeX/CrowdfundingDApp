const express = require('express');
const router = express.Router();
const mydb =  require('../database');//导入数据库的链接

router.get('/search', (req, res)=>{
    let sqlQuery = 'select * from `recordinfo` where recordTo=? order by recordTime asc';
    mydb.query(sqlQuery, req.query.recordTo, function (err, rows, fields) {
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

router.post('/add',(req, res)=>{
    let data = req.body;
    console.log(req.body);
    res.send('success');
    let sqlQuery = 'INSERT INTO `recordinfo`(recordHash, recordFrom, recordBlockNumber, recordTo, recordTime) VALUES(?,?,?,?,?)';
    let sqlParams = [data.recordHash, data.recordFrom, data.recordBlockNumber, data.recordTo, data.recordTime];
    mydb.query(sqlQuery, sqlParams, function (err, result, fields) {
        if(err)
        {
            throw err;
        }
        else
        {
            return result;
        }
    });
});


module.exports = router;