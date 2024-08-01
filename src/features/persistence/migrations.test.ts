import { LS_KEY_ROOMS } from './local-storage-keys'
import { getLocalStorageVersion } from './local-storage-version'
import { runMigrations } from './migrations'
import { expect } from 'vitest'

describe('migrations', () => {
  beforeEach(() => {
    globalThis.indexedDB = { open: () => ({}) } as unknown as IDBFactory
    localStorage.clear()
  })

  it('should run migrations', async () => {
    expect(getLocalStorageVersion()).toBe(0)
    await runMigrations()
    expect(getLocalStorageVersion()).toBeGreaterThan(0)
  })

  it('should migrate from prev sk0r version', async () => {
    localStorage.setItem(
      'SKOR:PLAYERS',
      JSON.stringify([
        { name: 'foo', color: 'red', id: '1' },
        { name: 'bar', color: 'blue', id: '2' },
      ]),
    )
    localStorage.setItem(
      'SKOR:SCORE',
      JSON.stringify({
        '1': { total: 10, diff: 10 },
        '2': { total: 20, diff: 20 },
      }),
    )
    expect(getLocalStorageVersion()).toBe(0)
    await runMigrations()
    expect(getLocalStorageVersion()).toBeGreaterThan(0)

    expect(localStorage.getItem('SKOR:PLAYERS')).toBeNull()
    expect(localStorage.getItem('SKOR:SCORE')).toBeNull()

    expect(localStorage.getItem(LS_KEY_ROOMS)).not.toBeNull()
  })
})
