import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('jobs', (table) => {
    table.increments('job_id').primary().notNullable();
    table.string('company').notNullable();
    table.string('title').notNullable();
    table.specificType('salary_range', 'integer ARRAY').notNullable();
    table.boolean('remote').notNullable();
    table.string('website').notNullable();
    table.string('found_on').notNullable();
    table.string('job_posting').notNullable();
    table.specificType('contacts', 'json ARRAY');
    table.string('notes');
    table.boolean('archived').notNullable();
    table.date('application_date').notNullable();
    table.integer('rank').notNullable();
    table.string('status').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('jobs');
}

