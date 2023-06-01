import { useState } from 'react';
import JobForm from '../JobForm/JobForm';
import {
  Typography,
  ButtonGroup,
  IconButton,
  Tooltip,
  Box,
  Paper,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { Edit, Inventory, KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
import type { JobType } from '../globalTypes';

// type SetStateType = React.Dispatch<React.SetStateAction<boolean | number | string| number[]>>

// type HandleFieldChangeType = (event: React.ChangeEvent<HTMLInputElement>, stateChangeFunc: SetStateType, valueType: string) => void

export default function Job(props: {job: JobType, getJobs: () => void}) {
  const { getJobs, job } = props
  const {
    job_id,
    company,
    title,
    salary_range,
    remote,
    website,
    found_on,
    job_posting,
    contacts,
    notes,
    archived,
    application_date,
    favorite,
    status,
  } = job;

  const [open, setOpen] = useState(false);
  const [rowOpen, setRowOpen] = useState(false);
  

  const handleClose = () => {
    setOpen(false)
  }

  const handleEditClick = () => {
    setOpen(true)
  }

  const handleArchiveClick = async () => {
    await fetch(`/jobs/archive/${job_id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({archived: !archived}),
    })
    .then(response => response.json())
    .then(response => console.log(response.message))
    .then(() => getJobs())
  }

  const Row = () => {
    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setRowOpen(!rowOpen)}
            >
              {rowOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="left">
            <a href={website} target="_blank" no-referrer="true">
              {company}
            </a>
          </TableCell>
          <TableCell align="left">{title}</TableCell>
          <TableCell align="center">{status[0].toUpperCase() + status.slice(1)}</TableCell>
          <TableCell align="right">
            ${salary_range && salary_range.length > 1 ? 
              (`${salary_range[0]} - $${salary_range[1]}`) 
              : (salary_range[0])}
          </TableCell>
          <TableCell align="right">Applied on: {application_date.split('T')[0]}</TableCell>
          <TableCell align="right">
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
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={rowOpen} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  More Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Remote: {`${remote}`}
                      </TableCell>
                      <TableCell>
                        <a href={job_posting} target="_blank" no-referrer="true">
                          Found on: {found_on}
                        </a>
                      </TableCell>
                      <TableCell >Contacts</TableCell>
                      <TableCell >Notes</TableCell>
                      <TableCell >Favorite: {`${favorite}`}</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{mb: 2}}>
        <Table aria-label="collapsible table">
          <TableBody>
            {Row()}
          </TableBody>
        </Table>
      </TableContainer>
      <JobForm
        jobFormOpen={open}
        handleClose={handleClose}
        getJobs={getJobs}
        formType="Edit"
        job={job}
      />
    </>
  )
}
