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
  favorite: boolean,
  status: 'applied' | 'interviewing' | 'rejected' | 'unavailable' | 'hired'
};

export interface ContactType extends Record<string, string> {
  name: string,
  phone: string,
  email: string,
  role: string
}
