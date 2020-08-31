// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model } from 'objection';
import Knex from 'knex';
import { Application } from '../declarations';

class role extends Model {
  createdAt!: string;
  updatedAt!: string;

  static get tableName() {
    return 'role';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text'],

      properties: {
        text: { type: 'string' }
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default function (app: Application) {
  const db: Knex = app.get('knex');

  db.schema.hasTable('role').then(exists => {
    if (!exists) {
      db.schema.createTable('role', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created role table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating role table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating role table', e)); // eslint-disable-line no-console

  return role;
}
