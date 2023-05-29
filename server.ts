import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

const STATIC_PATH = `${process.cwd()}/src/`;

import {
  getJobs,
  // postJob,
  // updateJob,
  // archiveJob,
  // deleteJob
} from './database.ts'

const app = express();
const port = 8080;
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/jobs', getJobs)
// app.post('/jobs', postJob)
// app.put('/jobs', updateJob)
// app.put('/jobs/archive', archiveJob)
// app.delete('/jobs', deleteJob)

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", async (_req, res) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(port, () => {
  console.log(`App running on port ${port}. static path: ${STATIC_PATH}`)
});