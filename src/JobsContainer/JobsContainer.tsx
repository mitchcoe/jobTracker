import React, {useState } from 'react'
import { Tabs, Tab, Box, TablePagination } from '@mui/material';
import Job from '../Job/Job';

import type { JobType } from '../globalTypes';

type TabPanelProps = {
  children?: React.ReactNode,
  index: number,
  value: number,
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function JobsContainer(props: {jobs: JobType[], getJobs: () => void,}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState(0);
  const { jobs, getJobs } = props

  // const testJobs = jobs && Array(6).fill(jobs[0])
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Job Applications" centered >
          <Tab label="Current" sx={{color: 'white', '&.Mui-selected': {outline: 'none'}}} {...a11yProps(0)} />
          <Tab label="Archived" sx={{color: 'white', '&.Mui-selected': {outline: 'none'}}} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {jobs.filter((job) => !job.archived).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job, key) => (
          <Job job={job} key={key + job.title} getJobs={getJobs}/>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {jobs.filter((job) => job.archived).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job, key) => (
          <Job job={job} key={key + job.title} getJobs={getJobs}/>
        ))}
      </TabPanel>
      <TablePagination
        component="div"
        count={jobs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 100]}
        sx={{
          color: 'white',
          '& .MuiTablePagination-actions button': {color: 'white'},
          '& .MuiTablePagination-selectIcon': {color: 'white'}
        }}
      />
    </Box>
  )

}