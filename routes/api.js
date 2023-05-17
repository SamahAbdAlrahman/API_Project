const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
  res.json('API working');
});

let x = 'f';

router.post('/loginManager', (req, res) => {
  console.log(req.body);

  // SQL query
  let sql = `SELECT * FROM manager WHERE mname='${req.body.mname}' AND mpass='${req.body.mpass}'`;

  // Execute the query
  db.query(sql, (err, result) => {
    if (err) throw err;

    // Check if the manager exists
    if (result.length > 0) {
      x = 't';
      res.send('Login successful');
    } else {
      res.send('Invalid credentials');
      x = 'f';
    }
  });
});



    // sign up manager 
    router.post('/createManagerAcount',(req,res)=>{

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
router.post('/loginManager', (req, res) => {
    console.log(req.body);
  
    // SQL query
    let sql = `SELECT * FROM manager WHERE mname= '${req.body.mname}' AND mpass = '${req.body.mpass}'`;
  
    // Execute the query
    db.query(sql, (err, result) => {
      if (err) throw err;
  
      // Check if the manager exists
      if (result.length > 0) {
x='t';
        res.send('Login successful');

      } else {
        res.send('Invalid credentials');
        x='f';
      }
    });
  });

  //log out
  router.get('/logoutManager', (req, res) => {
    x='f';
      res.send('Logged out successfully');
   
  });

  // add new job 

  router.post('/addjob',(req,res)=>{

    console.log(req.body);

    // sql query 
if(x='t'){
    let sql = ` INSERT INTO jobs(id,jname,jaddress,jsalary)
                VALUES('${req.body.id}','${req.body.jname}','${req.body.jaddress}','${req.body.jsalary}')
               `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data inserted');
    });        

}  else {  res.send('you are Logged out');
}

});

// show all job data 
router.get('/ViewJobs',(req,res)=>{
    let sql = `SELECT * FROM jobs`;
     // run query 
     db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
})
// view all applicant
router.get('/ViewApplicant',(req,res)=>{
  if(x=='t'){
  let sql = `SELECT * FROM applicant`;
   // run query 
   db.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result);
  });
}else{
  res.send('you are Logged out');
}
})
  // // delete single data 
  router.delete('/delete/:id', (req, res) => {
    let jobId = req.params.id;
  
    let deleteApplicantsSql = `DELETE FROM applicant WHERE job_id = '${jobId}'`;
  
    db.query(deleteApplicantsSql, (err, result) => {
      if (err) throw err;
      let deleteJobSql = `DELETE FROM jobs WHERE id = '${jobId}'`;
  
      db.query(deleteJobSql, (err, result) => {
        if (err) throw err;
        res.send('Data deleted');
      });
    });
  });
  

//update all job data
router.put('/update/:id', (req, res) => {
  if (x == 't') {
    let jobId = req.params.id;
    let newJobName = req.body.jname;

    let updateJobSql = `UPDATE jobs SET 
      jname = '${newJobName}',
      jsalary = '${req.body.jsalary}', 
      jaddress = '${req.body.jaddress}'
      WHERE id = '${jobId}'`;

    db.query(updateJobSql, (err, jobResult) => {
      if (err) throw err;

      let updateApplicantSql = `UPDATE applicant SET 
        jobApplicantName = '${newJobName}'
        WHERE job_id = '${jobId}'`;

      db.query(updateApplicantSql, (err, applicantResult) => {
        if (err) throw err;
        
        res.send('Data updated');
      });
    });
  } else {
    res.send('You are logged out');
  }
});

// update name
router.put('/updateJOBName/:id', (req, res) => {
    if (x == 't') {
      let jobId = req.params.id;
      let newJobName = req.body.jname;
  
      let updateJobSql = `UPDATE jobs SET 
        jname = '${newJobName}'
        WHERE id = '${jobId}'`;
  
      db.query(updateJobSql, (err, jobResult) => {
        if (err) throw err;
  
        let updateApplicantSql = `UPDATE applicant SET 
          jobApplicantName = '${newJobName}'
          WHERE job_id = '${jobId}'`;
  
        db.query(updateApplicantSql, (err, applicantResult) => {
          if (err) throw err;
          
          res.send('Data updated');
        });
      });
    } else {
      res.send('You are logged out');
    }
  });

  
// update address
router.put('/updateJobAddress/:id',(req,res)=>{
  if(x=='t'){
    let sql = `UPDATE jobs SET 
                jaddress = '${req.body.jaddress}'
                WHERE id = '${req.body.id}'
                `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data updated');
    }) 
}else  {  res.send('you are Logged out');
}
    
})
// update salary
router.put('/updateJobSalary/:id',(req,res)=>{
if(x=='t'){
    let sql = `UPDATE jobs SET 
    jsalary = '${req.body.jsalary}'
                WHERE id = '${req.body.id}'
                `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data updated');
    }) 
 } else  {  res.send('you are Logged out');
}           
})

module.exports = { router, x };
