import React, { useEffect, useCallback, useState } from 'react'
import './App.css'
import JobsContainer from './JobsContainer/JobsContainer'

import type { JobType } from './globalTypes'

function App() {
  const [jobs, setJobs] = useState<JobType[]>([])

  const getJobs = useCallback(async () => {
    await fetch('/jobs')
      .then(response => response.json())
      .then(response => setJobs(response))
      .catch(error => console.log(error));
  }, [])

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
        <JobsContainer jobs={jobs}/>
      </div>

    </React.Fragment>
  )
}

export default App
