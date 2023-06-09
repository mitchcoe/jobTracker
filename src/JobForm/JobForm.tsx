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

const sliderMarks = [
  {
    value: 65000,
    label: '$65000'
  },
  {
    value: 150000,
    label: '$150000'
  }
]

export default function JobForm(props: JobFormProps) {
  const { job, handleClose, getJobs, formType, jobFormOpen } = props
  const [companyName, setCompanyName] = useState( formType === 'Edit' ? job?.company : '')
  const [jobTitle, setJobTitle] = useState(formType === 'Edit' ? job?.title : '')
  const [jobSalaryRange, setJobSalaryRange] = useState<number[]>(job && formType === 'Edit' ? job.salary_range : [65000, 150000])
  const [isRemote, setIsRemote] = useState<boolean>(job && formType === 'Edit' ? job.remote : false)
  const [jobWebsite, setJobWebsite] = useState(formType === 'Edit' ? job?.website : '')
  const [jobFoundOn, setJobFoundOn] = useState(formType === 'Edit' ? job?.found_on : '')
  const [jobPosting, setJobPosting] = useState(formType === 'Edit' ? job?.job_posting : '')
  const [jobContact, setJobContact] = useState<ContactType | null>(formType === 'Edit' && job?.contacts && job.contacts[0] !== null ? job.contacts[0] : null)
  const [jobNotes, setJobNotes] = useState(job && formType === 'Edit' ? job.notes as string : '')
  const [conctactsChecked, setContactsChecked] = useState(formType === 'Edit' && job?.contacts && job.contacts[0] !== null ? !!job?.contacts : false);
  const [isFavorite, setIsFavorite] = useState(formType === 'Edit' ? job?.favorite : false)
  const [jobStatus, setJobStatus] = useState(formType === 'Edit' ? job?.status : '')
  const job_id = job?.job_id
  const applicationDate = job?.application_date || new Date().toISOString()

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setJobSalaryRange(newValue as number[]);
  };

  const handleCreateJob = async () => {
    const response = await fetch('/jobs', {
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
    }).catch(error => console.log(error));

    const data = response && await response.json() as {message: string, data: JobType}
    data && console.log(data.data)
    handleClearAndClose()
    getJobs()
  }

  const handleEditJob = async () => {
    const dataToUpdate: Record<string, string | number | number[] | boolean | undefined | null | ContactType[]> = {
      job_id,
      company: companyName,
      title: jobTitle,
      salary_range: jobSalaryRange,
      remote: isRemote,
      website: jobWebsite,
      found_on: jobFoundOn,
      job_posting: jobPosting,
      notes: jobNotes,
      // archived: false,
      application_date: applicationDate,
      favorite: isFavorite,
      status: jobStatus
    }

    // this helps ensure that there is more than just a role present on a contact to help identify them
    if(jobContact) {
      const contactKeys = Object.keys(jobContact)
      let count = 0
      if(contactKeys.length === 1 && contactKeys[0] === 'role') {
        dataToUpdate['contacts'] = null
      } else {
        for(const key in jobContact) {
          if(jobContact[key]) {
            dataToUpdate['contacts'] = [jobContact]
          } else {
            count++
          }
        }
        if(count === contactKeys.length || count >= 3) dataToUpdate['contacts'] = null
      }
    }

    const response = await fetch('/jobs', {
      method:'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToUpdate)
    }).catch(error => console.log(error))
    const data = response && await response.json() as {message: string, archived: JobType}
    data && console.log(data.message)
    handleClose()
    getJobs()
  }

  const handleDeleteJob = async () => {
    const response = await fetch(`/jobs/${job_id}`, {
      method:'Delete',
      headers: {
        "Content-Type": "application/json"
      },
    }).catch(error => console.log(error));

    const data = response && await response.json() as {message: string, id: number}
    data && console.log(data.message)
    handleClose()
    getJobs()
  }

  const handleSubmit = () => {
    if(formType === 'Edit') {
      handleEditJob()
    } else {
      handleCreateJob()
    }
  }

  const handleClearAndClose = () => {
    setCompanyName('')
    setJobTitle('')
    setJobSalaryRange([65000, 150000])
    setIsRemote(false)
    setJobWebsite('')
    setJobFoundOn('')
    setJobPosting('')
    setJobContact(null)
    setJobNotes('')
    setContactsChecked(false)
    setIsFavorite(false)
    handleClose()
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
  }

  const isValid = () => {
    if(companyName && jobTitle && jobWebsite && jobFoundOn && jobPosting) {
      return true
    } else {
      return false
    }
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
                required
              />
              <TextField
                label="Job Title"
                value={jobTitle}
                placeholder="Job Title"
                variant="outlined"
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
              <Typography gutterBottom>
                Salary Range
              </Typography>
              <Slider
                getAriaLabel={() => 'Salary range'}
                value={jobSalaryRange}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={65000}
                max={150000}
                step={5000}
                marks={sliderMarks}
                sx={{pb: 3}}
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
                required
              />
              <TextField
                label="Job Found on"
                value={jobFoundOn}
                placeholder="Job Found On"
                variant="outlined"
                onChange={(e) => setJobFoundOn(e.target.value)}
                required
              />
              <TextField
                label="Job Posting"
                value={jobPosting}
                placeholder="Job Posting"
                variant="outlined"
                onChange={(e) => setJobPosting(e.target.value)}
                required
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
                      <MenuItem value="hired">Hired</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                      <MenuItem value="unavailable">Unavailable</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}
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
              <TextareaAutosize
                minRows={3}
                placeholder="Notes"
                defaultValue={jobNotes}
                style={{color: "black", backgroundColor: 'white'}}
                onChange={(e) => setJobNotes(e.target.value)}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{justifyContent: 'space-evenly'}}>
            <Button variant="outlined" onClick={handleSubmit} disabled={!isValid()}>Submit</Button>
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