import {
  getLocalStorageVersion,
  setLocalStorageVersion,
} from './local-storage-version'
import { migration001 } from './migrations/001-from-single-game'

export async function runMigrations() {
  if (getLocalStorageVersion() < 1) {
    await runMigration(migration001, 1)
  }

  // if (getLocalStorageVersion() < 2) {
  //  // write next migration here
  // await runMigration(migration002, 2)
  // }
}

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
