import { rest } from 'msw'
import { JobType } from '../globalTypes'

export const jobs: JobType[] = [
  {
    job_id: 17,
    company: 'Walgreens',
    title: 'Software Engineer',
    salary_range: [ 65000, 150000 ],
    remote: false,
    website: 'www.walgreens.com',
    found_on: 'Indeed',
    job_posting: 'https://www.indeed.com/viewjob?from=app-tracker-saved-appcard&hl=en&jk=f115d3d74002caac&tk=1h21k774hih75801',
    contacts: null,
    notes: 'salary not posted, sign in via linkedin. Rejected 6/4/2023',
    archived: true,
    application_date: '2023-06-03T05:00:00.000Z',
    favorite: false,
    status: 'rejected'
  },
  {
    job_id: 16,
    company: 'Test Company',
    title: 'Test Title',
    salary_range: [100000, 120000],
    remote: true,
    website: 'https://www.test.com',
    found_on: 'Indeed',
    job_posting: 'https://www.test.com',
    contacts: [
      {
        name: 'Test Name',
        email: '',
        phone: '',
        role: ''
      }
    ],
    notes: 'Test Notes',
    archived: false,
    application_date: '2023-06-03T05:00:00.000Z',
    favorite: false,
    status: 'applied',
  }
]

export const handlers = [
  rest.get('http://localhost:5172/jobs', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(jobs)
    )
  }),
  rest.post('/jobs', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(jobs)
    )
  }),
  rest.put('/jobs', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(jobs)
    )
  }),
  rest.put('/jobs/archive/17', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(jobs)
    )
  }),
  rest.delete('/jobs/17', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(jobs)
    )
  }),
]
  