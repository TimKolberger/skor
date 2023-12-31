export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export function notFound(message: string) {
  return new NotFoundError(message)
}
