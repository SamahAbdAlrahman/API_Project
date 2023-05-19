const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { router } = require('./routes/api');
const apiSearchRoutes = require('./routes/apiSearch');
const A= require('./routes/employmentApplications');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);
app.use('/api/search', apiSearchRoutes.router2);
app.use('/api/Apply', A.router3);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




// // REST API CURD