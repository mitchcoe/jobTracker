import { render, screen} from './utils/test-utils'
import App from './App'

it('renders the app', async () => {
  render(<App />)
  expect(screen.getByText('Job Tracker')).toBeInTheDocument()
})
