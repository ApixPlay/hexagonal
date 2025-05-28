import { defineConfig } from '@adonisjs/lucid'
import env from '#shared_kernel/infrastructure/env'

const dbConfig = defineConfig({
  connection: 'postgres',
  prettyPrintDebugQueries: true,
  connections: {
    postgres: {
      client: 'pg',
      debug: true,
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: [
          'src/shared_kernel/infrastructure/database/migrations',
          'src/contexts/user_management/infrastructure/database/migrations',
        ],
      },
    },
  },
})

export default dbConfig
