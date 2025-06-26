import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('PG_HOST'), // Acessando PG_HOST
        port: 5432, // A porta do PostgreSQL, normalmente 5432
        user: env.get('PG_USER'), // Acessando PG_USER
        password: env.get('PG_PASSWORD'), // Acessando PG_PASSWORD
        database: env.get('PG_DB_NAME'), // Acessando PG_DB_NAME
        ssl: {
          rejectUnauthorized: false, // Permite a conexão SSL sem verificar o certificado do servidor
        },
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
