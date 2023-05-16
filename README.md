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

  // sign up manager 
    app.post('/api/createManagerAcount',(req,res)=>{

        let sql = ` INSERT INTO manager(mid,mname,mpass)
                    VALUES('${req.body.mid}','${req.body.mname}','${req.body.mpass}')
                   `;
        // run query 
        db.query(sql,(err,result)=>{
                if(err) throw err;
                res.send('Account created successfully');
        });        
    });

// Login manager
app.post('/api/loginManager', (req, res) => {
    console.log(req.body);
  
    // SQL query
    let sql = `SELECT * FROM manager WHERE mname= '${req.body.mname}' AND mpass = '${req.body.mpass}'`;
  
    // Execute the query
    db.query(sql, (err, result) => {
      if (err) throw err;
  
      // Check if the manager exists
      if (result.length > 0) {
 loggedin=true;
        res.send('Login successful');

      } else {
        res.send('Invalid credentials');
    loggedin=false;
      }
    });
  });
  

  //log out
  app.get('/api/logoutManager', (req, res) => {
   loggedin=false;
      res.send('Logged out successfully');
   
  });


// we using this code to insert a new data into DB (new job)
app.post('/api/create',(req,res)=>{
  if(loggedin == true){
    let sql = ` INSERT INTO jobs(id,jname,jaddress,jsalary)
                VALUES('${req.body.id}','${req.body.jname}','${req.body.jaddress}','${req.body.jsalary}')
               `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data inserted');
    }); 
    }else{ res.send('you are Logged out');}      
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
if(loggedin==true)
    let sql = `SELECT * FROM jobs`;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
     }else{ res.send('you are Logged out');}   
})
// in postman using GET methood localhost:3000/api/read
 and data returned as shown 
 [{"id":1,"jname":"Software Engineer","jaddress":"Nablus ","jsalary":"$123 - $456"},{"id":2,"jname":"markting","jaddress":"salfet","jsalary":"1000$"},
 {"id":3,"jname":"hardware eng","jaddress":"qlqeleah","jsalary":"20000"},
  {"id":9,"jname":"marketing","jaddress":"borkan","jsalary":"300$-500$"}]
  
  // search with id 
app.get('/api/read/:id',(req,res)=>{
  if( loggedin==true){
    let sql = `SELECT * FROM jobs
                WHERE id = '${req.params.id}'
                `;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    }); 
    }else {res.send('you are Logged out');}
    });
//    url request using GET methood : localhost:3000/api/read/6
//response in postman:[{"id":6,"jname":"sm","jaddress":"","jsalary":""}]


  // // delete job with id  
app.delete('/api/delete/:id',(req,res)=>{
 if( loggedin==true){
    let sql = `DELETE FROM jobs 
                WHERE id = '${req.params.id}'
                `;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('data deleted');
    });  
    }else {res.send('you are Logged out');}  
});
//url using DELDETE methood --> localhost:3000/api/delete/9 














//update job name 
//in postman using PUT methood localhost:3000/api/updateJobName/2
app.put('/api/updateJobName/:id',(req,res)=>{
 if( loggedin==true){
         let sql = `UPDATE jobs SET 
                    jname = '${req.body.jname}'
                    WHERE id = '${req.body.id}'
                    `;
        // run query 
        db.query(sql,(err,result)=>{
                if(err) throw err;
                res.send('data updated');
        }) 
          }else {res.send('you are Logged out');}
})
//update address 
app.put('/api/updateJobAddress/:id',(req,res)=>{
 if( loggedin==true){
    let sql = `UPDATE jobs SET 
                jaddress = '${req.body.jaddress}'
                WHERE id = '${req.body.id}'
                `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data updated');
    }) 
         } else  {  res.send('you are Logged out'); } 
})
//update salary
app.put('/api/updateJobSalary/:id',(req,res)=>{
   if( loggedin==true){
    let sql = `UPDATE jobs SET 
    jsalary = '${req.body.jsalary}'
                WHERE id = '${req.body.id}'
                `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data updated');
    })   
         } else  {  res.send('you are Logged out'); } 
})


//update all job data
app.put('/api/update/:id',(req,res)=>{
    if( loggedin==true){
        let sql = `UPDATE jobs SET 
        jsalary = '${req.body.jsalary}', 
        jname = '${req.body.jname}', 
        jaddress = '${req.body.jaddress}'
        WHERE id = '${req.params.id}'`;
        // run query 
        db.query(sql,(err,result)=>{
                if(err) throw err;
                res.send('data updated');
        }) 
     } else  {  res.send('you are Logged out'); }           
    })
