import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("jobs").del();

    // Inserts seed entries
    await knex("jobs").insert([
        {
          job_id: 1,
          company: 'Modernize',
          title: 'Junior Front End Developer',
          salary_range: [65000, 75000],
          remote: true,
          website: 'https://modernize.com/',
          found_on: 'Linkedin',
          job_posting: 'https://www.linkedin.com/jobs/view/3592373745/?refId=1e663e69-0154-48f2-8a96-d1b78bc5e61c&trackingId=YRqSrQKxQYGlTBPmN8hz7A%3D%3D',
          contacts: null,
          notes: null,
          archived: false,
          application_date: '2023-05-27',
          rank: 1,
          status: 'applied',
        },
    ]);
}
