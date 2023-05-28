export type JobType = {
  jobId?: number,
  company: string,
  title: string,
  salaryRange: number[],
  remote: boolean,
  website: string,
  foundOn: string,
  jobPosting: string,
  contacts: ContactType[] | null,
  notes: string | null,
  archived: boolean,
  applicationDate: string,
  rank: number,
  status: 'applied' | 'interviewing' | 'rejected' | 'unavailable'
};

export type ContactType = {
  name: string,
  phone: string,
  email: string,
  role: string
};
