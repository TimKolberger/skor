import humanId from 'human-id'

export function createUniqueId() {
  return humanId({ capitalize: false, separator: '-' })
}
