import { useState } from 'react';
import JobForm from '../JobForm/JobForm';
import TextAreaModal from '../TextAreaModal/TextAreaModal';
import {
  Typography,
  ButtonGroup,
  Button,
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
  TableRow,
} from '@mui/material'
import { Edit, Inventory, KeyboardArrowDown, KeyboardArrowUp, Favorite, FavoriteBorder} from '@mui/icons-material';
import type { JobType } from '../globalTypes';

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
  const [notesOpen, setNotesOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  

  const handleClose = () => {
    setOpen(false)
  }

  const handleEditClick = () => {
    setOpen(true)
  }

  const handleNotesOpen = () => {
    setNotesOpen(true)
  }

  const handleNotesClose = () => {
    setNotesOpen(false)
  }

  const handleContactsOpen = () => {
    setContactsOpen(true)
  }

  const handleContactsClose = () => {
    setContactsOpen(false)
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

  const handleFavoriteClick = async () => {
    await fetch(`/jobs/archive/${job_id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({job_id, favorite: !favorite}),
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
                      <TableCell ><Button onClick={handleContactsOpen}>Contacts</Button></TableCell>
                      <TableCell ><Button onClick={handleNotesOpen}>Notes</Button></TableCell>
                      <TableCell >
                        Favorite:
                        <IconButton onClick={handleFavoriteClick}>
                          {favorite ? (<Favorite sx={{color: 'red'}}/>) : (<FavoriteBorder />)}
                        </IconButton>
                      </TableCell>
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
      <TextAreaModal 
        modalOpen={notesOpen}
        closeFunc={handleNotesClose}
        placeholderText="Notes"
        text={notes as string}
      />
      <TextAreaModal 
        modalOpen={contactsOpen}
        closeFunc={handleContactsClose}
        placeholderText="Contacts"
        text={// eslint-disable-next-line
          // @ts-ignore
          contacts && contacts[0] !== null ? `${contacts[0].name}\n${contacts[0].phone}\n${contacts[0].email}\n${contacts[0].role}\n` : 'No Contacts'
        }
      />
    </>
  )
}
