import { runMigrations } from './migrations.ts'

runMigrations().catch((error) => {
  console.error(error)
})
