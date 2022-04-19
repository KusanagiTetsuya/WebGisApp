// const Bundler = require('parcel-bundler');
// const http = require('http');
const express = require('express');
const mysql = require('mysql');
// const fs = require('fs');

// let bundler = new Bundler('./index.html');

//Create connection to db
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_webgisapp',
    // port:8000
});

//Connect
db.connect((err) => {
    
    if(err){
        throw err;
    }
    console.log('MySql Connected...')
})

const app = express();
// const app2 = express();
// const coba = "";
//Select table
app.get('/getdata',(req,res)=>{
    let sql = 'SELECT * FROM tb_testing LIMIT 3';
    let query = db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        // const coba = results;
        res.send('Fetched...')
    })
})
app.listen('4000',() => {
    console.log('Server started on port 4000')
})
// module.exports= {coba};
// app2.use(bundler.middleware());
// app2.listen('1234',()=>{
//     console.log('Server started on port 1234')
// })


