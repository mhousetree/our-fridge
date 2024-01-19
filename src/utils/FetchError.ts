export class FetchError extends Error {
  status: number;
  statusText: string;
  url: string;

  constructor(response: Response) {
    super(response.statusText);
    this.name = 'FetchError';
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
  }
}
