import React, { useEffect, useCallback, useState } from 'react'
import Button from '@mui/material/Button'
import './App.css'
import JobsContainer from './JobsContainer/JobsContainer'
import JobForm from './JobForm/JobForm'

import type { JobType } from './globalTypes'

function App() {
  const [jobs, setJobs] = useState<JobType[]>([])
  const [open, setOpen] = useState(false);

  const getJobs = useCallback(async () => {
    await fetch('/jobs')
      .then(response => response.json())
      .then(response => setJobs(response))
      .catch(error => console.log(error));
  }, [])

  const openJobForm = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return (
    <React.Fragment>
      <div>
        <h1>
          Job Tracker
        </h1>
      </div>
      <div>
        <Button
          variant="outlined"
          sx={{mb: 2, color: 'white', borderColor: 'white'}}
          onClick={openJobForm}
        >
          Track New Job +
        </Button>
      </div>
      <div>
        <JobsContainer jobs={jobs} getJobs={getJobs}/>
      </div>
      <JobForm
        jobFormOpen={open}
        handleClose={handleClose}
        getJobs={getJobs}
        formType="Create"
      />
    </React.Fragment>
  )
}

export default App
