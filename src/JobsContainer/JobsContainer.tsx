import React, { useEffect, useCallback, useState } from 'react'
import { Tabs, Tab, Box, Typography, Pagination } from '@mui/material';
import Job from '../Job/Job';

import type { JobType } from '../globalTypes';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
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

export default function JobsContainer(props: {jobs: JobType[]}) {
  const { jobs } = props
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        {jobs.filter((job) => !job.archived).map((job, key) => (
          <Job {...job} key={key + job.title}/>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {jobs.filter((job) => job.archived).map((job, key) => (
          <Job {...job} key={key + job.title}/>
        ))}
      </TabPanel>
    </Box>
  )

}