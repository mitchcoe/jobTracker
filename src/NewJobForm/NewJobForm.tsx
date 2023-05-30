import { useState } from 'react';
import {
  TextField,
  Stack,
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Card,
  CardActions,
  CardContent,
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';

import type { JobType } from '../globalTypes';

export default function NewJobForm(props: {rank: number, handleClose: () => void}) {
  const { rank, handleClose } = props
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobSalaryRange, setJobSalaryRange] = useState('')
  const [isRemote, setIsRemote] = useState<boolean | string>('')
  const [jobWebsite, setJobWebsite] = useState('')
  const [jobFoundOn, setJobFoundOn] = useState('')
  const [jobPosting, setJobPosting] = useState('')
  const [jobContacts, setJobContacts] = useState<JobType[] | null>(null)
  const [jobNotes, setJobNotes] = useState('')
  const [applicationDate, setAppplicationDate] = useState(new Date().toISOString())
  const [jobRank, setJobRank] = useState(rank)
  const [jobStatus, setJobStatus] = useState('Applied')

  const handleCreateJob = async () => {
    let formattedSalaryRange: string[] | number[] = jobSalaryRange.indexOf(',') !== -1 ? 
      jobSalaryRange.split(',') : [jobSalaryRange]
    formattedSalaryRange = formattedSalaryRange.map((salaryItem: string) => parseInt(salaryItem))
  
    await fetch('/jobs', {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        company: companyName,
        title: jobTitle,
        salary_range: [formattedSalaryRange],
        remote: isRemote,
        website: jobWebsite,
        found_on: jobFoundOn,
        job_posting: jobPosting,
        contacts: null,
        notes: jobNotes,
        archived: false,
        application_date: applicationDate,
        rank,
        status: jobStatus
      }),
    })
    .then(response => response.json())
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
  }

  const handleRemoteChange = (event: SelectChangeEvent) => {
    event.target.value === "true" ? setIsRemote(true) : setIsRemote(false)
  }

  return (
    <Box
      component="form"
      encType="multipart/form-data"
      autoComplete="off"
      sx={{minWidth: '300px', width: '30vw'}}
    >
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Company"
              value={companyName}
              placeholder="Company"
              variant="outlined"
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              label="Job Title"
              value={jobTitle}
              placeholder="Job Title"
              variant="outlined"
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <TextField
              label="Job Salary"
              value={jobSalaryRange}
              placeholder="Job Salary"
              variant="outlined"
              onChange={(e) => setJobSalaryRange(e.target.value)}
            />
            <FormControl>
              <InputLabel id="remote-position">Remote Position</InputLabel>
              <Select
                labelId="remote-position"
                label="Remote Position"
                value={`${isRemote}`}
                // placeholder="Remote Position?"
                variant="outlined"
                onChange={handleRemoteChange}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Job Website"
              value={jobWebsite}
              placeholder="Job Website"
              variant="outlined"
              onChange={(e) => setJobWebsite(e.target.value)}
            />
            <TextField
              label="Job Found on"
              value={jobFoundOn}
              placeholder="Job Found On"
              variant="outlined"
              onChange={(e) => setJobFoundOn(e.target.value)}
            />
            <TextField
              label="Job Posting"
              value={jobPosting}
              placeholder="Job Posting"
              variant="outlined"
              onChange={(e) => setJobPosting(e.target.value)}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{justifyContent: 'space-evenly'}}>
          <Button variant="outlined" onClick={handleCreateJob}>Submit</Button>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
        </CardActions>
      </Card>
    </Box>
  )
}