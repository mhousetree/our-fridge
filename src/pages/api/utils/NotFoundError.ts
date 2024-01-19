export class NotFoundError extends Error {
  statusText: string;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusText = message;
  }
}
