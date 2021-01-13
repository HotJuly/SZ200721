const express = require('express');
const {resolve} = require('path');

const app = express();

app.use(
    express.static(
        resolve(__dirname,"./public"),
        {
            maxAge:3600000
        }
    )
)

app.listen('3000',function(error){
    if(error)return;
    console.log('服务器启动成功,启动于:http://localhost:3000');
})