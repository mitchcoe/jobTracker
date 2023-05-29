import { Request, Response } from 'express';
import knexPackage from 'knex';
import knexConfig from './knexfile.js'
const knex = knexPackage(knexConfig['development']);

export const getJobs = async(_request: Request, response: Response) => {
  try {
    const query = await knex.select().from('jobs');
    // console.log(query)
    response.status(200).json(query);
  } catch(e: unknown) {
    console.log((e as Error).stack)
  }
}

// export const postJob = async(request: Request, response: Response) => {
//   try {
//     const {
//       job_id,
//       company,
//       title,
//       salary_range,
//       remote,
//       website,
//       found_on,
//       job_posting,
//       contacts,
//       notes,
//       archived,
//       application_date,
//       rank,
//       status,
//      } = request.body;

//      const query = await knex('events').insert(
//       {
//         job_id,
//         company,
//         title,
//         salary_range,
//         remote,
//         website,
//         found_on,
//         job_posting,
//         contacts: contacts || null,
//         notes: notes || null,
//         archived,
//         application_date,
//         rank,
//         status,
//       }, ['*']);

//     await response.status(200).send({
//       data: query,
//       message: `Event created with event ID ${query[0].event_id}`
//     });
//   } catch(e: unknown) {
//     console.log((e as Error).stack)
//   }
// }

// export const updateJob = async(request: Request, response: Response) => {
//   try {

//   } catch(e: unknown) {
//     console.log((e as Error).stack)
//   }
// }

// export const archiveJob = async(request: Request, response: Response) => {
//   try {

//   } catch(e: unknown) {
//     console.log((e as Error).stack)
//   }
// }

// export const deleteJob = async(request: Request, response: Response) => {
//   try {

//   } catch(e: unknown) {
//     console.log((e as Error).stack)
//   }
// }