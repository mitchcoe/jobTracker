export type JobType = {
  job_id?: number,
  company: string,
  title: string,
  salary_range: number[],
  remote: boolean,
  website: string,
  found_on: string,
  job_posting: string,
  contacts: ContactType[] | null,
  notes: string | null,
  archived: boolean,
  application_date: string,
  rank: number,
  status: 'applied' | 'interviewing' | 'rejected' | 'unavailable'
};

export type ContactType = {
  name: string,
  phone: string,
  email: string,
  role: string
};
