import { prefix } from './prefix.ts'

const LS_KEY_MIGRATION_VERSION = `${prefix}migration-version`

function setVersion(version: number) {
  localStorage.setItem(LS_KEY_MIGRATION_VERSION, JSON.stringify(version))
}

function getVersion() {
  const rawVersion = localStorage.getItem(LS_KEY_MIGRATION_VERSION)
  try {
    return rawVersion ? JSON.parse(rawVersion) : 0
  } catch {
    return 0
  }
}

const version = getVersion()

if (version < 1) {
  // clear previous data
  for (const key of [
    'chakra-ui-color-mode',
    'SKOR:STEP',
    'SKOR:MUTED',
    'SKOR:PLAYERS',
    'SKOR:SCORE',
    'SKOR:SORT',
  ]) {
    localStorage.removeItem(key)
  }
  setVersion(1)
}

// if (version < 2) {
//  // write next migration here
//  setVersion(2)
// }
