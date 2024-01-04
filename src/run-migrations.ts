import { runMigrations } from './features/persistence/migrations.ts'

runMigrations().catch((error) => {
  console.error(error)
})
