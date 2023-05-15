# API_Project
// we using Node.js MySql REST API
//we using Postman - XAMPP - visual studio code


// this code to connection with mysql database  
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'apicrud'
});



//and we check if the database connected
db.connect((err)=>{
    if(err) throw err;
    else
    {
        console.log('database connected ....');
    }
});




//we are using port 3000
app.listen('3000',()=>{
    console.log('server is running....');
})



// we using this code to insert a new data into DB (new job)
app.post('/api/create',(req,res)=>{
    console.log(req.body);
    // sql query 
    let sql = ` INSERT INTO jobs(id,jname,jaddress,jsalary)
                VALUES('${req.body.id}','${req.body.jname}','${req.body.jaddress}','${req.body.jsalary}')
               `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data inserted');
    });        
});


//and we control adding data by postman , using POST methood --> localhost:3000/api/create
//then we insert data as follwing example
//in JOSN
// {
//  "id":1,
//   "jname":"Software Engineer",
//          "jaddress":"borkan",
//           "jsalary":"300$-500$"  }



// get data (return all jobs )
app.get('/api/read',(req,res)=>{
    // sql query 
    let sql = `SELECT * FROM jobs`;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
})
// in postman using GET methood localhost:3000/api/read
 and data returned as shown 
 [{"id":1,"jname":"Software Engineer","jaddress":"Nablus ","jsalary":"$123 - $456"},{"id":2,"jname":"markting","jaddress":"salfet","jsalary":"1000$"},
 {"id":3,"jname":"hardware eng","jaddress":"qlqeleah","jsalary":"20000"},
  {"id":9,"jname":"marketing","jaddress":"borkan","jsalary":"300$-500$"}]
