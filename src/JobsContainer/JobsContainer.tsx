import React, {useState } from 'react'
import Job from '../Job/Job';
import { Tabs, Tab, Box, TablePagination, IconButton, MenuItem, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  North,
  South
} from '@mui/icons-material'

import type { JobType } from '../globalTypes';

type TabPanelProps = {
  children?: React.ReactNode,
  index: number,
  value: number,
}
type Order = 'asc' | 'desc';
type OrderProperty = 'remote' | 'application_date' | 'favorite'

type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function salarySort(a: JobType, b: JobType, orderBy: 'salary_range' = 'salary_range') {
  const salaryA: number = a[orderBy].length === 1 ? a[orderBy][0] : a[orderBy][1];
  const salaryB: number = b[orderBy].length === 1 ? b[orderBy][0] : b[orderBy][1];
  if (salaryB < salaryA) {
    return -1;
  }
  if (salaryB > salaryA) {
    return 1;
  }
  return 0;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if(orderBy === 'salary_range') return salarySort(a as JobType, b as JobType)
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | boolean },
  b: { [key in Key]: number | string | boolean },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        sx={{'&:disabled': {color: 'grey'}, color: 'white'}}
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        sx={{'&:disabled': {color: 'grey'}, color: 'white'}}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        sx={{'&:disabled': {color: 'grey'}, color: 'white'}}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        sx={{'&:disabled': {color: 'grey'}, color: 'white'}}
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
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
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState< 'remote' | 'application_date' | 'favorite'>('application_date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [value, setValue] = useState(0);
  const { jobs, getJobs } = props

  const handleRequestSort = (
    event: SelectChangeEvent,
  ) => {
    const property: 'remote' | 'application_date' | 'favorite' = event.target.value as OrderProperty
    setOrderBy(property);
  };

  const handleDescendingOrAscendingOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  }

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
        { jobs.filter((job) => !job.archived)
          .sort(getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((job, key) => (
          <Job job={job} key={key + job.title} getJobs={getJobs}/>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        { jobs.filter((job) => job.archived)
          .sort(getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((job, key) => (
          <Job job={job} key={key + job.title} getJobs={getJobs}/>
        ))}
      </TabPanel>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Typography>Sort By:</Typography>
        <Select
          value={orderBy}
          onChange={handleRequestSort}
          sx={{color: 'white', '& fieldset': {border: 'none'}, '& svg': {color: 'white'}}}
        >
          <MenuItem value="application_date">
            Application Date
          </MenuItem>
          <MenuItem value="salary_range">
            Salary
          </MenuItem>
          <MenuItem value="remote">
            Remote Position
          </MenuItem>
          <MenuItem value="favorite">
            Favorites
          </MenuItem>
        </Select>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={handleDescendingOrAscendingOrder}
        >
          {order === 'asc' ? <North sx={{color: 'white'}}/> : <South sx={{color: 'white'}}/>}
        </IconButton>
        <Typography>{order === 'asc' ? 'Asc' : 'Desc'}</Typography>
      </div>
      <TablePagination
        component="div"
        count={jobs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 100]}
        ActionsComponent={TablePaginationActions}
        sx={{
          color: 'white',
          '& .MuiTablePagination-actions button': {color: 'white'},
          '& .MuiTablePagination-selectIcon': {color: 'white'},
        }}
      />
    </Box>
  )

}