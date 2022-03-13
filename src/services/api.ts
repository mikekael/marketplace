import {ApiResponse, ApisauceInstance, create} from 'apisauce';

type ApiConfig = {
  /**
   * Api base url
   *
   * @type {string}
   */
  baseURL: string;
};

type Headers = Record<string, string>;
type RequestOptions = {
  headers?: Headers;
};
type QueryParams = Record<string, string>;
type RequestBody<T extends Record<string, any>> = T;
type RequestResult<T> = Promise<{
  /**
   * Request status code
   */
  status: number;
  data: T | undefined;
}>;

class ApiService {
  /**
   * Instance of the http to be used for requesting
   *
   * @type {ApisauceInstance}
   */
  protected http: ApisauceInstance;

  /**
   * Create instance of the api service
   *
   * @param {ApiConfig} config
   */
  constructor(protected readonly config: ApiConfig) {
    this.http = create({
      baseURL: config.baseURL,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  /**
   * Do a GET request
   *
   * @param   {string} path
   * @param   {QueryParams} queryParams
   * @param   {RequestOptions} options
   *
   * @returns {RequestResult<T>}
   */
  get<T>(
    path: string,
    queryParams?: QueryParams,
    options?: RequestOptions,
  ): RequestResult<T> {
    return this.http
      .get<T>(path, queryParams, {
        headers: options?.headers,
      })
      .then(response => this.mapResponse(response));
  }

  /**
   * Do a POST request
   *
   * @param {string} path
   * @param {RequestBody<BU>} body
   * @param {RequestOptions} options
   *
   * @returns {RequestResult<T>}
   */
  post<T, U>(
    path: string,
    body: RequestBody<U>,
    options?: RequestOptions,
  ): RequestResult<T> {
    return this.http
      .post<T>(path, body, {
        headers: options?.headers,
      })
      .then(response => this.mapResponse(response));
  }

  /**
   * Map response information
   *
   * @param  {ApiResponse} response
   */
  protected mapResponse<T>(response: ApiResponse<T>) {
    return {
      status: response.status || 0,
      data: response.data,
    };
  }
}

export default ApiService;
