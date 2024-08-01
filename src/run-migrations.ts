import { runMigrations } from './features/persistence/migrations'

runMigrations().catch((error) => {
  console.error(error)
})
