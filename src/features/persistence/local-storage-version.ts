import { prefix } from './prefix'
import { safeJsonParse } from './safe-json-parse'

const LS_KEY_MIGRATION_VERSION = `${prefix}migration-version`

export function setLocalStorageVersion(version: number) {
  localStorage.setItem(LS_KEY_MIGRATION_VERSION, JSON.stringify(version))
}

export function getLocalStorageVersion() {
  return safeJsonParse(localStorage.getItem(LS_KEY_MIGRATION_VERSION), 0)
}
