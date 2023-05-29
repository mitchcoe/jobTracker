// import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { JobType } from '../globalTypes';

export default function Job(props: JobType) {
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
  rank,
  status,
 } = props;

 return (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`panel${job_id}-content`}
      id={`panel${job_id}-header`}
      sx={{'& .MuiAccordionSummary-content': {justifyContent: 'space-around'}, width: '50vw'}}
    >
      <Typography>
        Rank: {rank}
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
    </AccordionSummary>
    <AccordionDetails>
      <List>
        <ListItem>
          <Typography>
            Date applied: {application_date.split('T')[0]}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            Remote: {`${remote}`}
          </Typography>
        </ListItem>
        <ListItem>
          <a href={website}>
            <Typography>
              Company website: {company}
            </Typography>
          </a>
        </ListItem>
        <ListItem>
          <Typography>
            Job posting found on: {found_on}
          </Typography>
        </ListItem>
        <ListItem sx={{display: 'flex', flexDirection: 'row'}}>
          <a href={job_posting}>
          <Typography>
            Job posting
          </Typography>
            {/* {job_posting} */}
          </a>
        </ListItem>
        <ListItem>
          <Typography>
            Contacts: {contacts ? contacts[0].name : ''}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            Notes: {notes}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            Archived: {`${archived}`}
          </Typography>
        </ListItem>
      </List>
    </AccordionDetails>
  </Accordion>
 )
}
