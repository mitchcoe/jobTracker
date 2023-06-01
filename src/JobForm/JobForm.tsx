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
  FormControlLabel,
  Modal
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import type { JobType, ContactType } from '../globalTypes';

function valuetext(value: number) {
  return `$${value}`;
}

type JobFormProps = {
  jobFormOpen: boolean,
  handleClose: () => void,
  getJobs: () => void,
  job?: JobType,
  formType: "Create" | "Edit"
}

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function JobForm(props: JobFormProps) {
  const { job, handleClose, getJobs, formType, jobFormOpen } = props
  const [companyName, setCompanyName] = useState(job?.company || '')
  const [jobTitle, setJobTitle] = useState(job?.title || '')
  const [jobSalaryRange, setJobSalaryRange] = useState<number[]>(job?.salary_range || [65000, 150000])
  const [isRemote, setIsRemote] = useState<boolean>(job?.remote || false)
  const [jobWebsite, setJobWebsite] = useState(job?.website || '')
  const [jobFoundOn, setJobFoundOn] = useState(job?.found_on || '')
  const [jobPosting, setJobPosting] = useState(job?.job_posting || '')
  const [jobContact, setJobContact] = useState<ContactType | null>(job?.contacts && job.contacts[0] !== null && job.contacts[0] || null)
  const [jobNotes, setJobNotes] = useState(job?.notes || '')
  const [conctactsChecked, setContactsChecked] = useState(job?.contacts && job.contacts[0] !== null && !!job?.contacts || false);
  const [isFavorite, setIsFavorite] = useState(job?.favorite || false)
  const [jobStatus, setJobStatus] = useState(job?.status || '')
  const job_id = job?.job_id
  const applicationDate = job?.application_date || new Date().toISOString()

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
        favorite: isFavorite,
        status: 'applied'
      }),
    })
    .then(response => response.json())
    .then(response => console.log(response.data))
    .then(() => handleClose())
    .then(() => getJobs())
    .catch(error => console.log(error));
  }

  const handleEditJob = async () => {
    await fetch('/jobs', {
      method:'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        job_id,
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
        application_date: applicationDate,
        favorite: isFavorite,
        status: 'applied'
      })
    })
    .then(response => response.json())
    .then(response => console.log(response.data))
    .then(() => handleClose())
    .then(() => getJobs())
    .catch(error => console.log(error));
  }

  const handleDeleteJob = async () => {
    await fetch(`/jobs/${job_id}`, {
      method:'Delete',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(response => console.log(response.message))
      .then(() => handleClose())
      .then(() => getJobs())
      .catch(error => console.log(error));
  }

  const handleSubmit = () => {
    if(formType === 'Edit') {
      handleEditJob()
    } else {
      handleCreateJob()
    }
  }

  const handleRemoteChange = (event: SelectChangeEvent) => {
    event.target.value === "true" ? setIsRemote(true) : setIsRemote(false)
  }

  const handleFavoriteChange = (event: SelectChangeEvent) => {
    event.target.value === "true" ? setIsFavorite(true) : setIsFavorite(false)
  }

  const handleJobStatusChange = (event: SelectChangeEvent) => {
    setJobStatus(event.target.value)
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
    <Modal
      open={jobFormOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        encType="multipart/form-data"
        autoComplete="off"
        sx={[modalStyles, {minWidth: '300px', width: '30vw', overflow: 'scroll', maxHeight: '85vh'}]}
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
              {formType === "Edit" && (
                <>
                  <FormControl>
                    <InputLabel id="job-status">Job Status</InputLabel>
                    <Select
                      labelId="job-status"
                      label="Job Status"
                      value={jobStatus}
                      variant="outlined"
                      onChange={handleJobStatusChange}
                    >
                      <MenuItem value="applied">Applied</MenuItem>
                      <MenuItem value="interviewing">Interviewing</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                      <MenuItem value="unavailable">Unavailable</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel id="favorite">Favorite?</InputLabel>
                    <Select
                      labelId="favorite"
                      label="Favorite?"
                      value={`${isFavorite}`}
                      variant="outlined"
                      onChange={handleFavoriteChange}
                    >
                      <MenuItem value="true">True</MenuItem>
                      <MenuItem value="false">False</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}
              <TextareaAutosize
                minRows={3}
                placeholder="Notes"
                style={{color: "black", backgroundColor: 'white'}}
                onChange={(e) => setJobNotes(e.target.value)}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{justifyContent: 'space-evenly'}}>
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" onClick={handleClose}>Close</Button>
            {formType === 'Edit' && (
              <Button variant="outlined" sx={{color: 'red', borderColor: 'red'}} onClick={handleDeleteJob}>Delete</Button>
            )}
          </CardActions>
        </Card>
      </Box>
    </Modal>
  )
}