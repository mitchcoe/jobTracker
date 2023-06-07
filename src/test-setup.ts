import { server } from './mocks/test-server'
import { beforeAll, afterAll, afterEach } from 'vitest'
import '@testing-library/jest-dom'

import fetch, {Request, Response, Headers} from 'node-fetch'
// eslint-disable-next-line
// @ts-ignore
globalThis.fetch = fetch
// eslint-disable-next-line
// @ts-ignore
globalThis.Request = Request
// eslint-disable-next-line
// @ts-ignore
globalThis.Headers = Headers
// eslint-disable-next-line
// @ts-ignore
globalThis.Response = Response

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())