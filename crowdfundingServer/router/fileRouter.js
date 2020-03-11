const express = require('express');
const router = express.Router();
const multer = require('multer');

let storage = multer.diskStorage({
   destination:function (req, file, cb) {
     cb(null, './uploads/images')//指定文件路径
   },
    filename:function (req, file, cb) {
       console.log('----------', file);
       let temp = file.originalname.split('.');
       let type = temp[temp.length - 1];
       let tmpName = (new Date()).getTime() + parseInt(Math.random()*99999);
        cb(null, `${tmpName}.${type}`)//指定文件名
    }
});
let upload = multer({
   storage: storage
});

router.post('/upload', upload.single('upImage'), (req, res)=>{
    console.log(req.file);
    let {size, mimetype, path} = req.file;
    let types = ['jpg', 'jpeg', 'png', 'gif'];
    let tmpType = mimetype.split('/')[1];
    if(size > 10000000){
        return res.send({err:-1, msg:'图片过大'})
    }else if(types.indexOf(tmpType) === -1){
        return res.send({err:-2, msg:'格式错误'})
    } else {
        let url = `/public/images/${req.file.filename}`;
        return res.send({err:0, url:url});
    }
});


module.exports = router;