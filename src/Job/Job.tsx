import { useState } from 'react';
import JobForm from '../JobForm/JobForm';
// import ListItemText from '@mui/material/ListItemText';
import {
  // List,
  // ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ButtonGroup,
  IconButton,
  Tooltip,
  // TextField,
  // Box,
  // Button,
  Popper
} from '@mui/material'
import { ExpandMore, Edit, Inventory} from '@mui/icons-material';
import type { JobType } from '../globalTypes';

// type SetStateType = React.Dispatch<React.SetStateAction<boolean | number | string| number[]>>

// type HandleFieldChangeType = (event: React.ChangeEvent<HTMLInputElement>, stateChangeFunc: SetStateType, valueType: string) => void

export default function Job(props: {job: JobType, getJobs: () => void}) {
  const {
    job_id,
    company,
    title,
    salary_range,
    // remote,
    // website,
    // found_on,
    // job_posting,
    // contacts,
    // notes,
    // archived,
    // application_date,
    // favorite,
    status,
  } = props.job;

  const { getJobs, job } = props

  const [editing, setEditing] = useState(false)
  // const [companyName, setCompanyName] = useState(company)
  // const [jobTitle, setJobTitle] = useState(title)
  // const [jobSalaryRange, setJobSalaryRange] = useState(salary_range)
  // const [isRemote, setIsRemote] = useState(remote)
  // const [jobWebsite, setJobWebsite] = useState(website)
  // const [jobFoundOn, setJobFoundOn] = useState(found_on)
  // const [jobPosting, setJobPosting] = useState(job_posting)
  // const [jobContacts, setJobContacts] = useState(contacts)
  // const [jobNotes, setJobNotes] = useState(notes || '')
  // const [isArchived, setIsArchived] = useState(archived)
  // const [applicationDate, setAppplicationDate] = useState(application_date.split('T')[0])
  // const [isFavorited, setIsFavorited] = useState(favorite)
  // const [jobStatus, setJobStatus] = useState(status)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const id = open ? 'edit-job-popper' : undefined;

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  const handleEditClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setEditing(!editing)
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleArchiveClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();

  }

  // const handleFieldChange: HandleFieldChangeType = (event, stateChangeFunc, valueType) => {
  //   if(valueType === 'number') {
  //     stateChangeFunc(parseInt(event.target.value))
  //   } else if(valueType === 'object') {
  //     stateChangeFunc([parseInt(event.target.value.split(',')[0]), parseInt(event.target.value.split(',')[1])])
  //   } else {
  //     stateChangeFunc(event.target.value)
  //   }
  // }

  // const handleSubmit = (_event: React.SyntheticEvent) => {
  //   return;
  // }

  // const CustomTextField = (label: string, value: string | number| number[], valueType: string, stateChangeFunc: SetStateType) => (
  //   <TextField
  //     label={label}
  //     value={value}
  //     placeholder={label}
  //     variant="outlined"
  //     InputProps={{readOnly: !editing}}
  //     onChange={(e) => handleFieldChange(e as React.ChangeEvent<HTMLInputElement>, stateChangeFunc, valueType)}
  //   />
  // )

  // const EditingTextFields = () => (
  //   <Box
  //     component="form"
  //     sx={{
  //       '& .MuiTextField-root': { m: 1, width: '25ch' },
  //     }}
  //     noValidate
  //     autoComplete="off"
  //   >
  //     <div>
  //       {editing && (
  //         <>
  //           {/* {CustomTextField("Rank", (jobRank.toString()), "number", setJobRank as SetStateType)} */}
  //           {CustomTextField("Company Name", companyName, "string", setCompanyName as SetStateType)}
  //           {CustomTextField("Title", jobTitle, "string", setJobTitle as SetStateType)}
  //           {CustomTextField("Status", jobStatus[0].toUpperCase() + jobStatus.slice(1), "string", setJobStatus as SetStateType)}
  //           {CustomTextField("Salary Range", jobSalaryRange, "object", setJobSalaryRange as SetStateType)}
  //           {CustomTextField("Date applied", applicationDate, "string", setAppplicationDate as SetStateType)}
  //         </>
  //       )}
  //       {CustomTextField("Remote", `isRemote`, "string", setIsRemote as SetStateType)}
  //       {CustomTextField("Company Website", jobWebsite, "string", setJobWebsite as SetStateType)}
  //       {CustomTextField("Job Posting Found On", jobFoundOn, "string", setJobFoundOn as SetStateType)}
  //       {CustomTextField("Job posting", jobPosting, "string", setJobPosting as SetStateType)}
  //       {/* {CustomTextField("Contacts", jobContacts, setJobContacts)} */}
  //       {/* {CustomTextField("Archived", isArchived, setIsArchived)} */}
  //       {CustomTextField("Notes", jobNotes, "string", setJobNotes as SetStateType)}
  //     </div>
  //     <div>
  //       {editing && (
  //         <Button variant="outlined" onClick={handleSubmit} sx={{mt: 2}}>Submit</Button>
  //       )}
  //     </div>
  //   </Box>
  // )

  return (
    <>
      <Accordion onClick={(e) => e.stopPropagation()}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls={`panel${job_id}-content`}
          id={`panel${job_id}-header`}
          sx={{'& .MuiAccordionSummary-content': {justifyContent: 'space-around'}, maxWidth: '1500px', width: '1500px'}}
          onClick={(e) => {e.stopPropagation(); e.preventDefault()}}
        >
          <Typography>
            {/* Rank: {rank} */}
          </Typography>
          <Typography>
            {company}
          </Typography>
          <Typography>
            {title}
          </Typography>
          <Typography>
            Status: {status[0].toUpperCase() + status.slice(1)}
          </Typography>
          <Typography>
            ${salary_range && salary_range.length > 1 ? (`${salary_range[0]} - $${salary_range[1]}`) : (salary_range[0])}
          </Typography>
          <ButtonGroup>
            <Tooltip title="Edit">
              <IconButton onClick={handleEditClick}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Archive Job Posting">
              <IconButton onClick={handleArchiveClick}>
                <Inventory />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </AccordionSummary>
        <AccordionDetails>
          {/* {EditingTextFields()} */}
        </AccordionDetails>
      </Accordion>
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
        <JobForm
          handleClose={handleClose}
          getJobs={getJobs}
          formType="Edit"
          job={job}
        />
      </Popper>
    </>
  )
}
