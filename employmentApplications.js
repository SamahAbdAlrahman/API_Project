const express = require('express');
const router3 = express.Router();
const db = require('../database/connection');
// const A = require('./routes/employmentApplications');

router3.get('/', (req, res) => {
  res.json('API working');
});
// // تقديم ع وظيفة

router3.post('/applications/:job_id', (req, res) => {
    const job_id = req.params.job_id;
    const { fullname, address, age, ScientificQualification, MobileNumber, email, priorExperiences, moreDetails } = req.body;
  
    let selectJobSql = `SELECT id, jname FROM jobs WHERE id = ${job_id}`;
  
    db.query(selectJobSql, (err, jobResult) => {
      if (err) {
        throw err;
      }
  
      if (jobResult.length === 0) {
        res.status(404).send('Job not found');
        return;
      }
  
      const job = jobResult[0];
      const { id: jobId, jname } = job;
  
      // Generate a unique primary key value
      let selectMaxIdSql = `SELECT MAX(idApplicant) AS maxId FROM applicant`;
      db.query(selectMaxIdSql, (err, maxIdResult) => {
        if (err) {
          throw err;
        }
  
        const maxId = maxIdResult[0].maxId || 0;
        const newId = maxId + 1;
  
        let insertApplicantSql = `INSERT INTO applicant (idApplicant, fullname, address, age, ScientificQualification, MobileNumber, email, priorExperiences, moreDetails, job_id, jobApplicantName)
                                  VALUES ('${newId}', '${fullname}', '${address}', '${age}', '${ScientificQualification}', '${MobileNumber}', '${email}', '${priorExperiences}', '${moreDetails}', '${jobId}', '${jname}')`;
  
        db.query(insertApplicantSql, (err, result) => {
          if (err) {
            throw err;
          }
          res.send('Successfully submitted application');
        });
      });
    });
  });
  

// /حذف الطلب
//
router3.delete('/deleteApplications/:fullname/:job_id', (req, res) => {
    const fullname = req.params.fullname;
    const job_id = req.params.job_id;
  
    let deleteApplicantSql = `DELETE FROM applicant WHERE fullname = '${fullname}' AND job_id = ${job_id}`;
  
    db.query(deleteApplicantSql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send('Successfully deleted applicant');
    });
  });
  
  //تعديله
  router3.put('/updateApplications/:fullname/:job_id', (req, res) => {
    const fullname = req.params.fullname;
    const job_id = req.params.job_id;
  
    const { address, age, ScientificQualification, MobileNumber, email, priorExperiences, moreDetails } = req.body;
  
    let updateApplicantSql = `UPDATE applicant SET address = '${address}', age = '${age}', ScientificQualification = '${ScientificQualification}', MobileNumber = '${MobileNumber}', email = '${email}', priorExperiences = '${priorExperiences}', moreDetails = '${moreDetails}' WHERE fullname = '${fullname}' AND job_id = ${job_id}`;
  
    db.query(updateApplicantSql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send('Successfully updated applicant');
    });
  });
  //كل الوظائف الي قدم الهن
  router3.get('/searchAllApplications/:fullname', (req, res) => {
    const fullname = req.params.fullname;
  
    let searchApplicantsSql = `SELECT * FROM applicant WHERE fullname = '${fullname}'`;
  
    db.query(searchApplicantsSql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });
  //بحث عن وظيفة معينة مقدم الها
//مع حغظ عمليات البحث  
router3.get('/searchApplication/:fullname/:job_id', (req, res) => {
    const fullname = req.params.fullname;
    const job_id = req.params.job_id;
    const search_date = new Date().toISOString().slice(0, 10); // Current date
  
    let searchApplicantSql = `SELECT * FROM applicant WHERE fullname = '${fullname}' AND job_id = ${job_id}`;
  
    db.query(searchApplicantSql, (err, result) => {
      if (err) {
        throw err;
      }
      let jobNameSql = `SELECT jname FROM jobs WHERE id = ${job_id}`;
  
      db.query(jobNameSql, (err, jobNameResult) => {
        if (err) {
          throw err;
        }
  
        if (jobNameResult.length === 0) {
          res.status(404).send('Job not found');
          return;
        }
  
        const job_name = jobNameResult[0].jname;
        const applicant_fullname = fullname;
  
        // Save the search in the searched_jobs table
        let saveSearchedJobSql = `INSERT INTO searched_jobs (job_name, search_date, applicant_fullname) VALUES ('${job_name}', '${search_date}', '${applicant_fullname}')`;
  
        db.query(saveSearchedJobSql, (err, saveResult) => {
          if (err) {
            throw err;
          }
  
          res.send(result);
        });
      });
    });
  });
  

 //استرجاع تاريخ البحث كل متقدم ببحث باسمه
  router3.get('/searchHistory/:fullname', (req, res) => {
    const fullname = req.params.fullname;
  
    let retrieveSearchesSql = `SELECT DATE_FORMAT(search_date, '%Y-%m-%d') AS formatted_date, job_name FROM searched_jobs WHERE applicant_fullname = '${fullname}'`;
  
    db.query(retrieveSearchesSql, (err, result) => {
      if (err) {
        throw err;
      }
      
      const searchHistory = result.map((row) => {
        return {
          search_date: row.formatted_date,
          job_name: row.job_name
        };
      });
  
      res.send(searchHistory);
    });
  });
  
   
module.exports = {
    router3: router3
  };
  