var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();



app.use(cors());
app.use(bodyparser.json());


app.listen('3000',()=>{
    console.log('server is running....');
})



// mysql database connection 

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'apicrud'
});

// check db connection 
db.connect((err)=>{
    if(err) throw err;
    else
    {
        console.log('database connected ....');
    }
});


// REST API CURD

app.get('/api',(req,res)=>{
    res.json('Api working');
});


// Create data 

app.post('/api/create',(req,res)=>{

    console.log(req.body);

    // sql query 

    let sql = ` INSERT INTO jobs(id,jname)
                VALUES('${req.body.id}','${req.body.jname}')
               `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data inserted');
    });        


});
















