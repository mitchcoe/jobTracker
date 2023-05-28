import express from 'express';
import bodyParser from 'body-parser';
// import {
//   getJobs,
//   postJob,
//   updateJob,
//   archiveJob,
//   deleteJob
// } from './database.ts'

const app = express();
const port = 8080;
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.get('/jobs', getJobs)
// app.post('/jobs', postJob)
// app.put('/jobs', updateJob)
// app.put('/jobs/archive', archiveJob)
// app.delete('/jobs', deleteJob)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});