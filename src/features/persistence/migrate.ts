import {
  getLocalStorageVersion,
  setLocalStorageVersion,
} from './local-storage-version.ts'
import { migration001 } from './migrations/001-from-single-game.ts'

const version = getLocalStorageVersion()

async function migrate() {
  if (version < 1) {
    await runMigration(migration001, 1)
  }

  // if (version < 2) {
  //  // write next migration here
  // await runMigration(migration002, 2)
  // }
}

migrate().catch((error) => {
  console.error(error)
})

async function runMigration(
  migration: () => void | Promise<void>,
  version: number,
) {
  try {
    await migration()
  } finally {
    setLocalStorageVersion(version)
  }
}
