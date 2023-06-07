import { render, screen} from '../utils/test-utils'
import JobsContainer from './JobsContainer'
import {jobs} from '../mocks/handlers.ts'

it('renders the jobs container', async () => {
  render(<JobsContainer jobs={jobs} getJobs={() => {}} />)
  expect(screen.getByText('Current')).toBeInTheDocument()
})