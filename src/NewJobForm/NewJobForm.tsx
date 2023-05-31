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
  Slider,
  Typography,
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';

import type { JobType } from '../globalTypes';

function valuetext(value: number) {
  return `$${value}`;
}

export default function NewJobForm(props: {rank: number, handleClose: () => void, getJobs: () => void}) {
  const { rank, handleClose, getJobs } = props
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobSalaryRange, setJobSalaryRange] = useState<number[]>([65000, 150000])
  const [isRemote, setIsRemote] = useState<boolean | string>('')
  const [jobWebsite, setJobWebsite] = useState('')
  const [jobFoundOn, setJobFoundOn] = useState('')
  const [jobPosting, setJobPosting] = useState('')
  const [jobContacts, setJobContacts] = useState<JobType[] | null>(null)
  const [jobNotes, setJobNotes] = useState('')
  const [applicationDate, setAppplicationDate] = useState(new Date().toISOString())
  const [jobRank, setJobRank] = useState(rank)
  const [jobStatus, setJobStatus] = useState('Applied')

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setJobSalaryRange(newValue as number[]);
  };

  const handleCreateJob = async () => {
    await fetch('/jobs', {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        company: companyName,
        title: jobTitle,
        salary_range: jobSalaryRange,
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
    .then(() => handleClose())
    .then(() => getJobs())
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
      <Card sx={{padding: '16px'}}>
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
            <Typography gutterBottom>
              Salary Range
            </Typography>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={jobSalaryRange}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={65000}
              max={150000}
              step={5000}
            />
            <FormControl>
              <InputLabel id="remote-position">Remote Position</InputLabel>
              <Select
                labelId="remote-position"
                label="Remote Position"
                value={`${isRemote}`}
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