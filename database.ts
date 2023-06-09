import { Request, Response } from 'express';
import knexPackage from 'knex';
import knexConfig from './knexfile.js'
const knex = knexPackage(knexConfig['development']);
import type { JobType } from './src/globalTypes.js';

export const getJobs = async(_request: Request, response: Response) => {
  try {
    const query = await knex.select().from('jobs');
    response.status(200).json(query);
  } catch(e: unknown) {
    console.log((e as Error).stack)
  }
}

export const postJob = async(request: Request, response: Response) => {
  try {
    const {
      company,
      title,
      salary_range,
      remote,
      website,
      found_on,
      job_posting,
      contacts,
      notes,
      archived,
      application_date,
      favorite,
      status,
     }: JobType = request.body;

     const query = await knex('jobs').insert(
      {
        company,
        title,
        salary_range,
        remote,
        website,
        found_on,
        job_posting,
        contacts: contacts || null,
        notes: notes || null,
        archived,
        application_date,
        favorite,
        status,
      }, ['*']);

    await response.status(200).send({
      data: query,
      message: `Job created with job ID ${query[0].job_id}`
    });
  } catch(e: unknown) {
    console.log((e as Error).stack)
  }
}

export const updateJob = async(request: Request, response: Response) => {
  try {
    const { job_id, ...rest } = request.body;
    const query = await knex('jobs').where({job_id}).update(rest, ['*']) as unknown as JobType[]
    response.status(200).send({
      message: `Job with ID: ${job_id} updated`,
      updated: query[0]
    })
  } catch(e: unknown) {
    console.log((e as Error).stack)
  }
}

export const archiveJob = async(request: Request, response: Response) => {
  try {
    const { job_id } = request.params;
    const {...rest } = request.body;
    const { archived } = rest;
    const query = await knex('jobs').where({job_id}).update(rest, ['*']) as unknown as JobType[]
    response.status(200).send({
      message: `Job with Job ID: ${job_id} ${archived ? 'archived' : 'unarchived'}`,
      archived: query[0],
    })
  } catch(e: unknown) {
    console.log((e as Error).stack)
  }
}

export const deleteJob = async(request: Request, response: Response) => {
  try {
    const { job_id } = request.params
    await knex.select().from('jobs').where({job_id}).del()
    response.status(200).send({
      message: `Job deleted with ID: ${job_id}`,
      id: job_id
    })
  } catch(e: unknown) {
    console.log((e as Error).stack)
  }
}