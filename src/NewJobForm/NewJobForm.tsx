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
  Checkbox,
  FormControlLabel
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import type { ContactType } from '../globalTypes';

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
  const [jobContact, setJobContact] = useState<ContactType | null>(null)
  const [jobNotes, setJobNotes] = useState('')
  const [conctactsChecked, setContactsChecked] = useState(false);

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
        contacts: [jobContact],
        notes: jobNotes,
        archived: false,
        application_date: new Date().toISOString(),
        rank,
        status: 'applied'
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

  const handleContactCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactsChecked(event.target.checked)
  }

  const handleContactChange = (key: string, value: string) => {
    setJobContact(Object.assign({...jobContact}, {[key]: value} as ContactType))
    console.log(jobContact)
  }

  const Contacts = () => (
    <>
      <TextField
        label="Name"
        value={jobContact?.name}
        placeholder="Name"
        variant="outlined"
        onChange={(e) => handleContactChange('name', e.target.value)}
      />
      <TextField
        label="Phone #"
        value={jobContact?.phone}
        placeholder="Phone #"
        variant="outlined"
        onChange={(e) => handleContactChange('phone', e.target.value)}
      />
      <TextField
        label="Email"
        value={jobContact?.email}
        placeholder="Email"
        variant="outlined"
        onChange={(e) => handleContactChange('email', e.target.value)}
      />
      <TextField
        label="Role"
        value={jobContact?.role}
        placeholder="Role"
        variant="outlined"
        onChange={(e) => handleContactChange('role', e.target.value)}
      />
    </>
  )
  return (
    <Box
      component="form"
      encType="multipart/form-data"
      autoComplete="off"
      sx={{minWidth: '300px', width: '30vw', overflow: 'scroll', maxHeight: '85vh'}}
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
            <FormControlLabel
              control={<Checkbox checked={conctactsChecked} onChange={handleContactCheckboxChange}/>}
              label="Contacts?"
            />
            {conctactsChecked && Contacts()}
            <TextareaAutosize
              minRows={3}
              placeholder="Notes"
              style={{color: "black", backgroundColor: 'white'}}
              onChange={(e) => setJobNotes(e.target.value)}
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