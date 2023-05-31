import React, { useEffect, useCallback, useState } from 'react'
import Button from '@mui/material/Button'
import Popper from '@mui/material/Popper';
import './App.css'
import JobsContainer from './JobsContainer/JobsContainer'
import NewJobForm from './NewJobForm/NewJobForm'

import type { JobType } from './globalTypes'

function App() {
  const [jobs, setJobs] = useState<JobType[]>([])
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const id = open ? 'simple-popper' : undefined;

  const getJobs = useCallback(async () => {
    await fetch('/jobs')
      .then(response => response.json())
      .then(response => setJobs(response))
      .catch(error => console.log(error));
  }, [])

  const openJobForm = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
        <JobsContainer jobs={jobs}/>
      </div>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        sx={{zIndex: 100}}
        modifiers={[
          {
            name: 'flip',
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: 'document',
              padding: 8,
            },
          },
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: 'document',
              padding: 8,
            },
          },
        ]}
      >
        <NewJobForm rank={jobs.length + 1} handleClose={handleClose} getJobs={getJobs}/>
      </Popper>
    </React.Fragment>
  )
}

export default App
