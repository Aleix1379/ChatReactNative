export default class Api {
  private static readonly url = 'https://jsonplaceholder.typicode.com';

  public static getUrl(path?: string): string {
    if (path) {
      return `${this.url}${path.startsWith('/') ? path : `/${path}`}`;
    }
    return this.url;
  }
}
