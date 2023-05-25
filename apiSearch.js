const express = require('express');
const router2 = express.Router();
const db = require('../database/connection');

router2.get('/', (req, res) => {
  res.json('API working');
});
// show all job data 
router2.get('/ViewAllJobs',(req,res)=>{
  let sql = `SELECT * FROM jobs`;
   // run query 
   db.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result);
  });
})
// Search with id localhost:3000/api/search/searchID/12
router2.get('/searchID/:id', (req, res) => {
  console.log(req.params.id);
  // SQL query
  let sql = `SELECT * FROM jobs WHERE id = '${req.params.id}'`;

  // Run query
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//     // sammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmah
//     // بعد اخر رفع 

    // search with job name  
    router2.get('/searchjname/:jname',(req,res)=>{
    console.log(req.params.jname);
    // sql query 
    let sql = `SELECT * FROM jobs
                WHERE jname = '${req.params.jname}'
                `;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });   
    });




// // saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaammmmmmmmmmmmmmmmmah
// localhost:3000/api/search/searchSalaryRange/$900-$9000
router2.get('/searchJob/:letter', (req, res) => {
    const letter = req.params.letter; 
 
    let sql = `SELECT * FROM jobs WHERE jname LIKE '${letter}%'`;
 
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
    // if(!err)  res.send('6666666666666666');
  });
  
  router2.get('/searchByaddress/:letter', (req, res) => {
    const letter = req.params.letter; 
    let sql = `SELECT * FROM jobs WHERE jaddress LIKE '${letter}%'`;
 
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
    // if(!err)  res.send('6666666666666666');
  });

  router2.get('/searchSalaryRange/:salary', (req, res) => {
    const salaryRange = req.params.salary;
    const salaryValues = salaryRange.split('-');
  
    if (salaryValues.length !== 2) {
      return res.status(400).send('Invalid salary range format');
    }
  
    const minSalary = parseInt(salaryValues[0].replace('$', ''), 10);
    const maxSalary = parseInt(salaryValues[1].replace('$', ''), 10);
  
    if (isNaN(minSalary) || isNaN(maxSalary)) {
      return res.status(400).send('Invalid salary range values');
    }
  
    let sql = `SELECT * FROM jobs WHERE jsalary >= ${minSalary} AND jsalary <= ${maxSalary}`;
  
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

module.exports = {
  router2: router2
};
