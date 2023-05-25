const express = require('express');
const router = express.Router();
const db = require('../database/connection');

var jwt=require('jsonwebtoken');






router.get('/', (req, res) => {
  res.json('API working');
});

let x = 'f';




const bcrypt = require('bcrypt');


// توليد "salt" لإضافة عنصر عشوائية لعملية التشفير
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// تشفير كلمة المرور باستخدام "salt" المولد وتوليد كلمة المرور المشفرة
    // sign up manager 
    router.post('/createManagerAcount',authenticateToken,(req,res)=>{
      const plainPassword = req.body.mpass;

       const hashedPassword = bcrypt.hashSync(plainPassword, salt);

        let sql = ` INSERT INTO manager(mid,mname,mpass)
                    VALUES('${req.body.mid}','${req.body.mname}','${hashedPassword}')
                   `;
        // run query 
        db.query(sql,(err,result)=>{
                if(err) throw err;
                res.send('Account created successfully');
        });        
    
    
    });
    function authenticateToken(req, res, next) {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader);
      if (token === null) {
        return res.sendStatus(401);
      }
   
      jwt.verify(token, 'ameera', (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }
    
        req.user = decoded;
        next();
      });
    }
    
  
// Login manager
router.post('/loginManager', (req, res) => {
  const query = `SELECT mpass FROM manager WHERE mname= '${req.body.mname}' `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return;
    }
  
    if (results.length > 0) {
      const storedHashedPassword = results[0].mpass;
      x='t';

      // قم بمقارنة كلمة المرور المدخلة مع كلمة المرور المشفرة المسترجعة
      const inputPassword = req.body.mpass;
      const isMatch = bcrypt.compareSync(inputPassword, storedHashedPassword);
  
      if (isMatch) {

        const payload = {
          mname: req.body.mname,
          role: 'manager'
        };

        const secretKey = 'ameera';
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        res.json({
          token: token,
          message: 'Login successful'
        });
    
        
      } else {
        // لم تتطابق كلمات المرور
        res.status(401).json({ message: 'Invalid credentials' });
        x='f';
      }
    } else {
      res.status(404).json({ message: 'User not found' });    }
      x='f';
  });



  });


  //log out
  router.get('/logoutManager', (req, res) => {
    x='f';
      res.send('Logged out successfully');
   
  });

  // add new job 

  router.post('/addjob',authenticateToken,(req,res)=>{

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


// view all applicant
router.get('/ViewApplicants',(req,res)=>{
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
  // // delete data 
  router.delete('/deleteJob/:id', (req, res) => {
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
router.put('/updateJob/:id', (req, res) => {
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
router.put('/updateJobName/:id', (req, res) => {
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
